from django.apps import AppConfig


class ActivitiesConfig(AppConfig):
    default_auto_field = 'django_mongodb_backend.fields.ObjectIdAutoField' # 'django.db.models.BigAutoField'
    name = 'activities'
