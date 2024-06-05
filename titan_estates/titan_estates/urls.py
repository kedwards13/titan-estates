from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from leads.views import PropertyViewSet
from .views import home  # Ensure this import is correct

router = DefaultRouter()
router.register(r'properties', PropertyViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('', home),  # Define the root URL
]


