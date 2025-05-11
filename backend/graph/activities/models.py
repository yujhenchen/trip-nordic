from django.db import models
from django_mongodb_backend.fields import ObjectIdAutoField
from django.conf import settings

# Create your models here.

# import uuid

class Activity(models.Model):
    id = ObjectIdAutoField(primary_key=True)  # MongoDB ObjectId
    # id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, primary_key=True)  # Unique identifier
    # idinternal = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)  # Internal identifier
    # accessible = models.BooleanField(default=False)  # Boolean instead of string "false"
    categories = models.JSONField(default=list, null=True)
    city = models.CharField(max_length=255)
    description = models.TextField()  # English description
    # languages = models.CharField(max_length=255)  # Comma-separated list of languages
    name = models.CharField(max_length=255, blank=False, null=False)  # English name
    region = models.CharField(max_length=255)
    seasons = models.JSONField(default=list)

    def __str__(self):
        return self.name
    
    class Meta:
        db_table = settings.FI_COLLECTION_NAME

class FiFilters(models.Model):
    name = models.CharField(max_length=255)
    items = models.JSONField(default=list)
    
    class Meta:
        db_table = settings.FI_FILTERS_COLLECTION_NAME

    def __str__(self):
        return self.name
