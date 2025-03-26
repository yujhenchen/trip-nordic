from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.tokens import RefreshToken
from django.http import JsonResponse
from rest_framework import  status
from rest_framework_simplejwt.exceptions import ExpiredTokenError, TokenError
from django.conf import settings

def get_token_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        settings.REFRESH_TOKEN_COOKIE_NAME: str(refresh),
        settings.ACCESS_TOKEN_COOKIE_NAME: str(refresh.access_token),
    }

def get_tokens(refreshToken):
    try:
        refresh = RefreshToken(refreshToken)
        return {
            settings.REFRESH_TOKEN_COOKIE_NAME: str(refresh),
            settings.ACCESS_TOKEN_COOKIE_NAME: str(refresh.access_token),
        }
    except TokenError:
        raise TokenError("The token is invalid.") 
    except Exception as e:
        raise Exception(f"Unexpected error: {e}")

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

def verify_token(token):
    try:
        access_token = AccessToken(token)
        return access_token
    except ExpiredTokenError:
        raise ExpiredTokenError("The token has expired.")
    except TokenError:
        raise TokenError("The token is invalid.")
    except Exception as e:
        raise Exception(f"Unexpected error: {e}")


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
