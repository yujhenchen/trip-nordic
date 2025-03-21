from django.http import JsonResponse
from rest_framework import views, status

class TripsView(views.APIView):
	def get(self, request):
		try:
			return JsonResponse({'message': 'Hello World!'}, status=status.HTTP_200_OK)
		except:
			return JsonResponse({'error': 'Unknown error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
		

	def post(self, request):
		try:
			return JsonResponse({'message': 'Hello World!'}, status=status.HTTP_200_OK)
		except:
			return JsonResponse({'error': 'Unknown error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
