from rest_framework import serializers
from rest_framework_gis.serializers import GeoFeatureModelSerializer
from .models import Sighting

class SendOtpSerializer(serializers.Serializer):
    email = serializers.EmailField()

class SendConfirmationSerializer(serializers.Serializer):
    email = serializers.EmailField()
    fullName = serializers.CharField(max_length=200)
    inquiryType = serializers.CharField(max_length=200)
    message = serializers.CharField()

class VerifyOtpSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField(min_length=6, max_length=6)

class SightingGeoSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = Sighting
        geo_field = 'location'
        fields = ('id', 'species', 'location')