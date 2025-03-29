# from rest_framework_simplejwt.exceptions import TokenError
# from django.http import JsonResponse
# from rest_framework import  status
# from rest_framework_simplejwt.exceptions import ExpiredTokenError, TokenError
# from utils.token import validate_access_token, get_tokens, set_auth_cookies, delete_auth_cookies
# from django.conf import settings

# def get_access_token(request):
#     try:
#         return request.COOKIES[settings.ACCESS_TOKEN_COOKIE_NAME]
#     except Exception as e:
#         print(e)
#         return None

# def get_new_tokens(request):
#     try:
#         refresh_token = request.COOKIES[settings.REFRESH_TOKEN_COOKIE_NAME]
#         return get_tokens(refresh_token)
#     except Exception as e:
#         print(e)

# class SilenceAuthMiddleware:
#     def __init__(self, get_response):
#         self.get_response = get_response

#     def __call__(self, request):
#         # if not target request method and endpoints, return response
#         # if get, handle get request
#         end_point_list = settings.HTTP_PROTECTED_ENDPOINTS.get(request.method)
#         if request.path not in end_point_list:
#             return self.get_response(request)

# 		# get access token from cookies
#         # validate token, if expired, get new tokens from refresh, set token to cookies, return response
#         access_token = get_access_token(request.COOKIES[settings.ACCESS_TOKEN_COOKIE_NAME])
#         response = self.get_response(request)
#         if access_token is None:
#             delete_auth_cookies(response)
#             return response

#         try:
#             validate_access_token(access_token)
#         except ExpiredTokenError:
#             tokens = get_new_tokens(request)
#             user_id = validate_access_token(tokens[settings.USER_ID_COOKIE_NAME])
#             set_auth_cookies(response, tokens, user_id)
#             return response
#         except TokenError as e:
#             print(e)
#             delete_auth_cookies(response)
#         except Exception as e:
#             print(e)
#             delete_auth_cookies(response)
#         return response


#         # if request.method == 'GET':
#         #     if request.path in settings.HTTP_GET_PROTECTED_ENDPOINTS:
#         #         try:
#         #             access_token = request.COOKIES[settings.ACCESS_TOKEN_COOKIE_NAME]
#         #             if not access_token:
#         #                 return JsonResponse({'error': 'Access token required'}, status=status.HTTP_401_UNAUTHORIZED)

#         #             try:
#         #                 validate_access_token(access_token)
#         #             except ExpiredTokenError:
#         #                 refresh_token = request.COOKIES[settings.REFRESH_TOKEN_COOKIE_NAME]
#         #                 tokens = get_tokens(refresh_token)
#         #                 user_id = validate_access_token(tokens[settings.USER_ID_COOKIE_NAME])

#         #                 response = self.get_response(request)
#         #                 set_auth_cookies(response, tokens, user_id)
#         #                 return response
#         #             except TokenError:
#         #                 response = JsonResponse({'error': 'Access token is invalid'}, status=status.HTTP_401_UNAUTHORIZED)
#         #                 delete_auth_cookies(response)
#         #                 return response
#         #             except Exception as e:
#         #                 print(e)
#         #                 response = JsonResponse({'error': 'Unknown error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
#         #             return self.get_response(request)

#         #         except KeyError:
#         #             response = JsonResponse({'error': 'Access token required'}, status=status.HTTP_401_UNAUTHORIZED)
#         #             delete_auth_cookies(response)
#         #             return response
#         #         except Exception as e:
#         #             print(e)
#         #             response = JsonResponse({'error': 'Unknown error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
#         #             delete_auth_cookies(response)
#         #             return response
#         # return self.get_response(request)
