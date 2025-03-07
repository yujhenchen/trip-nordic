from django.db import models
from utils.models_abstracts import AbstractModel
from django_extensions.db.models import (TimeStampedModel, ActivatorModel, TitleDescriptionModel)

class Contact(TimeStampedModel, ActivatorModel, TitleDescriptionModel, AbstractModel): 
	class Meta:
		verbose_name_plural = 'Contacts'

	name = models.CharField(verbose_name='Name', max_length=255)
	email = models.EmailField(verbose_name='Email', unique=True)
	message = models.TextField(verbose_name='Message')

	def __str__(self):
		return self.name
