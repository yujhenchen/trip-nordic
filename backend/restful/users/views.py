from django.http import JsonResponse
from rest_framework import views, status
from .serializers import UserSerializer
from .models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError

from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed
from django.middleware import csrf
from django.conf import settings

def get_token_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        settings.REFRESH_TOKEN_COOKIE_NAME: str(refresh),
        settings.ACCESS_TOKEN_COOKIE_NAME: str(refresh.access_token),
    }

def set_auth_cookies(response, tokens):
    for token_name in [settings.ACCESS_TOKEN_COOKIE_NAME, settings.REFRESH_TOKEN_COOKIE_NAME]:
        response.set_cookie(
            key=token_name,
            value=tokens[token_name],
            # Session cookie: Do not set max_age/expires
            httponly=True,
            secure=True,
            samesite='None',
            domain=settings.CLIENT_DOMAIN,
            path='/',
        )

class SignUpView(views.APIView):
    def post(self, request):
        try:
            user = request.data
            if User.objects.filter(email=user['email']).exists():
                return JsonResponse({'error': 'Email already exist'}, status=status.HTTP_400_BAD_REQUEST)

            serializer= UserSerializer(data=user)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return JsonResponse({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
            else: 
                return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
            return JsonResponse({'error': 'Failed to create user'}, status=status.HTTP_400_BAD_REQUEST)

class LogInView(views.APIView):
    def post(self, request):
        try:
            email = request.data['email']
            password = request.data['password']
        
            if not email or not password:
                return JsonResponse({'error': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)
            
            user = authenticate(email=email, password=password)
            if not user:
                raise AuthenticationFailed('Invalid credentials')
            
			# TODO: check active user?
        
            tokens = get_token_for_user(user)
            response = JsonResponse( {'user': {'email': user.email}}, status=status.HTTP_200_OK)
            set_auth_cookies(response, tokens)
            # TODO: what is this
            # csrf.get_token(request)
            return response
        except KeyError:
            return JsonResponse({'error': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)
        except AuthenticationFailed:
            return JsonResponse({'error': 'Invalid email or password'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(e)
            return JsonResponse({'error': 'Unknown error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class LogOutView(views.APIView):
    def post(self, request):
        try:
            refresh_token = request.COOKIES[settings.REFRESH_TOKEN_COOKIE_NAME]
            if not refresh_token:
                return JsonResponse({"error": "Refresh token required"}, status=status.HTTP_400_BAD_REQUEST)
            
            response = JsonResponse({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
            
            token = RefreshToken(refresh_token)
            token.blacklist()
            
            response.delete_cookie(settings.ACCESS_TOKEN_COOKIE_NAME)
            response.delete_cookie(settings.REFRESH_TOKEN_COOKIE_NAME)
            return response
        except TokenError as e:
            print(e)
            return JsonResponse({"error": "invalid Refresh token"}, status=status.HTTP_400_BAD_REQUEST)
        except KeyError:
            return JsonResponse({"error": "Refresh token required"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(e)
            return JsonResponse({'error': 'Unknown error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
