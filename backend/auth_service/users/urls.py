from django.urls import path
from . import views

urlpatterns = [
	path('signup/', views.CreateUserAPIView.as_view(), name='users'),
]