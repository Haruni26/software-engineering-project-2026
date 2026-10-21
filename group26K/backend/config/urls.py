"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from django.conf import settings
from django.conf.urls.static import static

from wagtail.admin import urls as wagtailadmin_urls
from wagtail import urls as wagtail_urls
from wagtail.documents import urls as wagtaildocs_urls

from .api import api_router

def sightings_inline(_request):
    return JsonResponse({
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "id": 999,
                "geometry": {"type": "Point", "coordinates": [-63.5752, 44.6488]},
                "properties": {"species": "Routing OK"}
            }
        ]
    }, status=200)

def root(_request):
    return JsonResponse({'status': 'ok', 'service': 'django',
                        'endpoints': ['/api/ping/', '/api/send-otp', '/api/verify-otp', '/api/send-confirmation/']})

urlpatterns = [
    path('sightings', sightings_inline),
    path('status/', root, name='root'),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('cms/', include(wagtailadmin_urls)),
    path('documents/', include(wagtaildocs_urls)),
    path('cms-api/v2/', api_router.urls),
    path('', include(wagtail_urls))
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
