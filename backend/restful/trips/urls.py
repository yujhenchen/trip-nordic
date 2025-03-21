from django.urls import path
from . import views

urlpatterns = [
	path('trips', views.TripsView.as_view(), name='trips'),
]
