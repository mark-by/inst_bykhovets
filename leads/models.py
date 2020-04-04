from django.db import models


class User(models.Model):
    name = models.CharField(max_length=128)
    user_name = models.CharField(max_length=32, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=64)
    description = models.TextField(max_length=256)
    gender = models.CharField(max_length=1, choices=[
        ('m', 'Male'),
        ('f', 'Female'),
        ('o', 'Other'),
        ('p', 'Prefer not to say')], default='m')
    deleted = models.BooleanField(default=False)
    rating = models.PositiveIntegerField(default=0)
    created_at = models.DateField(auto_now_add=True)
    avatar = models.CharField(max_length=512, blank=True, default="")
