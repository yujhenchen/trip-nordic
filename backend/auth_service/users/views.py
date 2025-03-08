from json import JSONDecodeError
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import views, status
from rest_framework.response import Response
from .serializers import UserSerializer

class CreateUserAPIView(views.APIView):
	
	def post(self, request):
		try:
			user = JSONParser().parse(request)
			serializer= UserSerializer(data=user)
			if serializer.is_valid(raise_exception=True):
				serializer.save()
				return Response(serializer.data, status=status.HTTP_201_CREATED)
			else: 
				return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
		except JSONDecodeError:
			return JsonResponse({'error': 'Invalid JSON data'}, status=status.HTTP_400_BAD_REQUEST)
