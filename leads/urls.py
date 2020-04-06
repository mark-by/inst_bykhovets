from rest_framework import routers
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings as django_settings
from .api import UserViewSet, sign_in, log_out, register, user_home, settings, change_password

router = routers.DefaultRouter()
# router.register('api/users', UserViewSet, 'users')

urlpatterns = router.get_urls() + [
    path('api/sign_in', sign_in),
    path('api/log_out', log_out),
    path('api/register', register),
    path('api/user_home', user_home),
    path('api/settings', settings),
    path('api/change_password', change_password),
] + static(django_settings.MEDIA_URL, document_root=django_settings.MEDIA_ROOT)
