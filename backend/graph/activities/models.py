from django.db import models
from django_mongodb_backend.fields import ObjectIdAutoField
from django.conf import settings
import uuid

# Create your models here.

class Activity(models.Model):
    # id = ObjectIdAutoField(primary_key=True)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)  # UUID
    categories = models.JSONField(default=list, null=True)
    city = models.CharField(max_length=255)
    description = models.TextField()
    name = models.CharField(max_length=255, blank=False, null=False)
    region = models.CharField(max_length=255)
    seasons = models.JSONField(default=list)
    # str fields for filtering use
    categoriesstr = models.CharField(max_length=255, null=True)
    seasonsstr = models.CharField(max_length=255, null=True)

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
