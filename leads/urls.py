from rest_framework import routers
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings as django_settings
from .api import *

router = routers.DefaultRouter()

urlpatterns = router.get_urls() + [
    path('api/sign_in', sign_in),
    path('api/log_out', log_out),
    path('api/register', register),
    path('api/user_home', user_home),
    path('api/user_posts', user_posts),
    path('api/own_posts', own_posts),
    path('api/like', like),
    path('api/browse', browse),
    path('api/settings', settings),
    path('api/change_password', change_password),
    path('api/comment', comment),
    path('api/post', post),
    path('api/delete_post', delete_post),
    path('api/header_data', header_data),
    path('api/follow', follow),
    path('api/get_user', get_user),
    path('api/index', index),
    path('api/following', following),
    path('api/followers', followers),
] + static(django_settings.MEDIA_URL, document_root=django_settings.MEDIA_ROOT)
