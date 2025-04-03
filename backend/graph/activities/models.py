from django.db import models
from django_mongodb_backend.fields import ObjectIdAutoField

# Create your models here.

import uuid

class Activity(models.Model):
    id = ObjectIdAutoField(primary_key=True)  # MongoDB ObjectId
    # id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, primary_key=True)  # Unique identifier
    idinternal = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)  # Internal identifier
    accessible = models.BooleanField(default=False)  # Boolean instead of string "false"
    category = models.CharField(max_length=255)  # Comma-separated categories
    city = models.CharField(max_length=255)
    descriptionen = models.TextField()  # English description
    languages = models.CharField(max_length=255)  # Comma-separated list of languages
    nameen = models.CharField(max_length=255)  # English name
    region = models.CharField(max_length=255)
    seasons = models.CharField(max_length=255)  # Comma-separated list of seasons

    def __str__(self):
        return self.nameen
