from django.shortcuts import render
from django.http import JsonResponse
import random
from django.conf import settings
from django.core.cache import cache
from django.core.mail import send_mail, EmailMessage
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils.decorators import method_decorator
from rest_framework.decorators import api_view, throttle_classes
from rest_framework.throttling import AnonRateThrottle
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import AllowAny
from .serializers import SendOtpSerializer, VerifyOtpSerializer, SendConfirmationSerializer
from rest_framework.viewsets import ReadOnlyModelViewSet
from .models import Sighting, ImportantLocation
from .serializers import SightingGeoSerializer
from django.views.decorators.http import require_http_methods
import json
from django.contrib.gis.geos import Point

from wagtail.images import get_image_model


@csrf_exempt                           # dev-only; fine for now

def upload_gallery_image(request):
    if request.method != "POST":
        return JsonResponse({"error": "Method not allowed"}, status=400)

    uploaded_file = request.FILES.get("file")
    if not uploaded_file:
        return JsonResponse({"error": "No file uploaded"}, status=400)

    Image = get_image_model()

    # Save image first so we get a real path
    image = Image(
        title=uploaded_file.name,
        file=uploaded_file,
    )
    image.save()

    # Tag as gallery
    image.tags.add("gallery")
    image.save()


    return JsonResponse(
        {
            "id": image.id,
            "title": image.title,
            "url": image.file.url,
            "tags": list(image.tags.names()),
            "moderation": "approved"
        },
        status=201
    )


@require_http_methods(["GET", "POST"])
def sightings(request):
    if request.method == "GET":
        feats = []
        for s in Sighting.objects.all().only("id", "species", "location"):
            if s.location:
                feats.append({
                    "type": "Feature",
                    "id": s.id,
                    "geometry": {
                        "type": "Point",
                        "coordinates": [float(s.location.x), float(s.location.y)]  # [lon, lat]
                    },
                    "properties": {"species": s.species or ""},
                })
        return JsonResponse({"type": "FeatureCollection", "features": feats}, status=200)

    try:
        data = json.loads(request.body or "{}")
        lon = float(data["lon"])
        lat = float(data["lat"])
    except Exception:
        return JsonResponse({"detail": "Provide numeric lon and lat"}, status=400)

    species = (data.get("species") or "").strip()
    obj = Sighting.objects.create(location=Point(lon, lat, srid=4326), species=species)

    feat = {
        "type": "Feature",
        "id": obj.id,
        "geometry": {"type": "Point", "coordinates": [lon, lat]},
        "properties": {"species": species},
    }
    return JsonResponse(feat, status=201)

@csrf_exempt
@require_http_methods(["GET", "POST"])
def important_locations(request):
    if request.method == "GET":
        feats = []
        for obj in ImportantLocation.objects.all().only("id", "location"):
            if obj.location:
                feats.append({
                    "type": "Feature",
                    "id": obj.id,
                    "geometry": {
                        "type": "Point",
                        "coordinates": [float(obj.location.x), float(obj.location.y)]
                    },
                    "properties": {
                        "name": obj.name or ""
                    }
                })
        return JsonResponse({"type": "FeatureCollection", "features": feats}, status=200)

    try:
        data = json.loads(request.body or "{}")
        lon = float(data["lon"]); lat = float(data["lat"])
    except Exception:
        return JsonResponse({"detail": "Provide numeric lon and lat"}, status=400)

    name = (data.get("name") or "").strip()
    obj = ImportantLocation.objects.create(location=Point(lon, lat, srid=4326), name=name)
    feat = {
        "type": "Feature",
        "id": obj.id,
        "geometry": {"type": "Point", "coordinates": [lon, lat]},
        "properties": {"name": name},
    }
    return JsonResponse(feat, status=201)

OTP_TTL_SECONDS = 600 

def _otp_key(email: str) -> str:
    return f"otp:{email.lower()}"

def _generate_otp() -> str:
    return f"{random.randint(100000, 999999)}"

@api_view(["POST"])
@throttle_classes([AnonRateThrottle])
def send_otp(request):
    serializer = SendOtpSerializer(data=request.data)
    if not serializer.is_valid():
        return Response({"error": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)

    email = serializer.validated_data["email"]
    otp = _generate_otp()
    cache.set(_otp_key(email), otp, timeout=OTP_TTL_SECONDS)

    subject = "Your OTP for Verification"
    text = f"Your OTP is {otp}. It will expire in 10 minutes."
    try:
        send_mail(subject, text, None, [email], fail_silently=False)
    except Exception as e:
        cache.delete(_otp_key(email))
        return Response({"error": "Failed to send OTP. Please try again."},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response({"message": "OTP sent successfully"}, status=status.HTTP_200_OK)

@api_view(["POST"])
def verify_otp(request):
    serializer = VerifyOtpSerializer(data=request.data)
    if not serializer.is_valid():
        return Response({"error": "Email and OTP are required"},
                        status=status.HTTP_400_BAD_REQUEST)

    email = serializer.validated_data["email"]
    otp = serializer.validated_data["otp"]

    cached = cache.get(_otp_key(email))
    if cached and cached == otp:
        cache.delete(_otp_key(email))
        return Response({"message": "OTP verified successfully"}, status=status.HTTP_200_OK)

    return Response({"error": "Invalid or expired OTP"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
def send_confirmation(request):
    serializer = SendConfirmationSerializer(data=request.data)
    if not serializer.is_valid():
        return Response({"error": "All fields are required to send confirmation email"},
                        status=status.HTTP_400_BAD_REQUEST)

    data = serializer.validated_data
    email = data["email"]
    full_name = data["fullName"]
    inquiry_type = data["inquiryType"]
    message = data["message"]

    subject = "Confirmation of Your Inquiry"
    body = (
        f"Hello {full_name},\n\n"
        "Thank you for reaching out to us with your inquiry. Here are the details:\n\n"
        f"Inquiry Type: {inquiry_type}\n"
        f"Message: {message}\n\n"
        "We will get back to you as soon as possible.\n\n"
        "Best regards,\nThe Support Team"
    )
    try:
        EmailMessage(subject=subject, body=body, to=[email]).send(fail_silently=False)
    except Exception:
        return Response({"error": "Failed to send confirmation email"},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response({"message": "Confirmation email sent successfully"}, status=status.HTTP_200_OK)
