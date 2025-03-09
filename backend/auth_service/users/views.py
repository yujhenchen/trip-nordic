from json import JSONDecodeError
from django.http import JsonResponse
from rest_framework import views, status
from .serializers import UserSerializer
from .models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed

def get_token_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class SignUpView(views.APIView):
    def post(self, request):
        try:
            serializer= UserSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
            else: 
                return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
            return JsonResponse({'error': 'Invalid request body'}, status=status.HTTP_400_BAD_REQUEST)

class LoginView(views.APIView):
    def post(self, request):
        try:
            email = request.data['email']
            password = request.data['password']
        
            if not email or not password:
                return JsonResponse({'error': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)
            
            user = authenticate(email=email, password=password)
            if not user:
                raise AuthenticationFailed("Invalid credentials")
        
            tokens = get_token_for_user(user)
            return JsonResponse(tokens, status=status.HTTP_200_OK)

        except KeyError:
            return JsonResponse({'error': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)
        except AuthenticationFailed:
            return JsonResponse({'error': 'Invalid email or password'}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return JsonResponse({'error': 'Unknown error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class LoginView(views.APIView):
    def post(self, request):
        try:
            refresh_token = request.data['refresh']
            if not refresh_token:
                return JsonResponse({"error": "Refresh token required"}, status=status.HTTP_400_BAD_REQUEST)
            
            token = RefreshToken(refresh_token)
            token.blacklist()
            return JsonResponse({"message": "Logged out successfully"}, status=status.HTTP_200_OK)

        except KeyError:
            return JsonResponse({"error": "Refresh token required"}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return JsonResponse({'error': 'Unknown error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
