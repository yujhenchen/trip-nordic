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

def get_tokens(refresh_token):
    try:
        refresh = RefreshToken(refresh_token)
        return {
            settings.REFRESH_TOKEN_COOKIE_NAME: str(refresh),
            settings.ACCESS_TOKEN_COOKIE_NAME: str(refresh.access_token),
        }
    except TokenError:
        raise TokenError("The token is invalid.") 
    except Exception as e:
        raise Exception(f"Unexpected error: {e}")

def set_auth_cookies(response, tokens, user_id):
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
    response.set_cookie(
		key=settings.USER_ID_COOKIE_NAME,
		value=user_id,
		# Session cookie: Do not set max_age/expires
		httponly=True,
		secure=True,	
		samesite='None',
		domain=settings.CLIENT_DOMAIN,
		path='/',
	)

def delete_auth_cookies(response):
	response.delete_cookie(settings.ACCESS_TOKEN_COOKIE_NAME)
	response.delete_cookie(settings.REFRESH_TOKEN_COOKIE_NAME)
	response.delete_cookie(settings.USER_ID_COOKIE_NAME)

def validate_access_token(token):
    try:
        access_token = AccessToken(token)
        user_id = access_token["user_id"]
        print(user_id)
        return access_token
    except ExpiredTokenError:
        raise ExpiredTokenError("The token has expired.")
    except TokenError:
        raise TokenError("The token is invalid.")
    except Exception as e:
        raise Exception(f"Unexpected error: {e}")
