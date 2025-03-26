from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import ExpiredTokenError, TokenError
from django.conf import settings

def get_tokens_for_user(user):
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
