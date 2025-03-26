from rest_framework_simplejwt.exceptions import TokenError
from django.http import JsonResponse
from rest_framework import  status
from rest_framework_simplejwt.exceptions import ExpiredTokenError, TokenError
from utils.token import verify_token, get_tokens, set_auth_cookies
from django.conf import settings

class SilenceAuthMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.method == 'GET':
            if request.path in settings.HTTP_GET_PROTECTED_ENDPOINTS: 
                try:
                    access_token = request.COOKIES[settings.ACCESS_TOKEN_COOKIE_NAME]
                    if not access_token:
                        return JsonResponse({'error': 'Access token required'}, status=status.HTTP_401_UNAUTHORIZED)
                    
                    try:
                        verify_token(access_token)
                    except ExpiredTokenError:
                        refresh_token = request.COOKIES[settings.REFRESH_TOKEN_COOKIE_NAME]
                        tokens = get_tokens(refresh_token)
                        response = self.get_response(request)
                        set_auth_cookies(response, tokens)
                        return response
                    except TokenError:
                        # TODO: delete cookies
                        return JsonResponse({'error': 'Access token is invalid'}, status=status.HTTP_401_UNAUTHORIZED)
                    
                    return self.get_response(request)
                except KeyError:
                    # TODO: delete cookies
                    return JsonResponse({'error': 'Access token required'}, status=status.HTTP_401_UNAUTHORIZED)
                except Exception as e:
                    print(e)
                    # TODO: delete cookies
                    return JsonResponse({'error': 'Unknown error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return self.get_response(request)
