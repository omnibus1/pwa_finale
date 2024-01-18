import datetime
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes
from rest_framework import status
from django.contrib.auth.models import User, Group
from.serializers import UserSerializer
from django.contrib.auth import authenticate
import jwt
from rest_framework import authentication
from rest_framework import exceptions
from .models import StoredToken


class UserAuthenitcation(authentication.BaseAuthentication):
    def authenticate(self, request):
        endpoint = "/".join(request.build_absolute_uri().split("/")[4:])
        if endpoint == "wycieczki/" and request.method == "GET":
            if request.META.get('HTTP_AUTHORIZATION'):
                token = request.META.get('HTTP_AUTHORIZATION')
                try:
                    payload = jwt.decode(token, "secret", algorithms="HS256")
                except:
                    raise exceptions.AuthenticationFailed('Failed to authenticate')
                user = User.objects.get(email=payload["username"])
                if not StoredToken.objects.filter(tokenValue=token).exists():
                    raise exceptions.AuthenticationFailed("Invalid token")
            return

        if not request.META.get('HTTP_AUTHORIZATION'):
            raise exceptions.AuthenticationFailed('Failed to authenticate')
        token = request.META.get('HTTP_AUTHORIZATION')

        try:
            payload = jwt.decode(token, "secret", algorithms="HS256")
            user = User.objects.get(email = payload["username"])
            if not StoredToken.objects.filter(tokenValue=token).exists():
                raise exceptions.AuthenticationFailed("Invalid token")

            if endpoint.startswith("oceny"):
                return
            if endpoint.startswith("grupy"):
                if payload["group"] in ["Admin", "Manager"]:
                    return

            if endpoint.startswith("komentarze"):
                if request.method == "POST":
                    if request.data["email"] == payload["username"]:
                        return
                if request.method == "DELETE":
                    if payload["group"] in ["Manager", "Admin"]:
                        return


            if endpoint.startswith("users"):
                if payload["group"] == "Admin":
                    return


            if endpoint.startswith("wycieczki"):
                if request.method in ["DELETE", "PUT", "POST"]:
                    if payload["group"] in ["Manager", "Admin"]:
                        return


            if endpoint.startswith("kupione_wycieczki"):
                if request.method == "GET":
                    if request.query_params.get("email") == payload["username"]:
                        return
                if request.method == "POST":
                    if request.data["email"] == payload["username"]:
                        return

            if endpoint.startswith("wycieczka"):
                return

            raise exceptions.AuthenticationFailed("Invalid token")


        except:
            raise exceptions.AuthenticationFailed('No such user')



def get_user_group():
    return Group.objects.get(name="User")

@api_view(["POST"])
def register_user(request):
    try:
        email = request.data["email"]
        password = request.data["password"]

        if User.objects.filter(email=email).exists():
            return Response({"error": "email taken"}, status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(email, email, password)
        user.save()

        user.groups.add(get_user_group())
        return Response({"status": "User created"})
    except:
        return Response({"status": "failed"}, status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
def login(request):
    try:
        email = request.data["email"]
        password = request.data["password"]
        user = authenticate(username=email, password=password)
        group = user.groups.all()[0].name

        if StoredToken.objects.filter(user=User.objects.get(email=email)).exists():
            StoredToken.objects.get(user=User.objects.get(email=email)).delete()

        payload = {"username": user.username, "group": group,
                   "exp": datetime.datetime.utcnow()+datetime.timedelta(minutes=60),
                   "iat": datetime.datetime.utcnow()}


        token = jwt.encode(payload, "secret", algorithm="HS256")
        # user = User.objects.get(email=email)
        db_token = StoredToken(user=user, tokenValue=token)
        db_token.save()

        return Response({"token": token, "email": email, "group": group})
    except:
        return Response({"status": "failed"}, status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@authentication_classes([UserAuthenitcation])
def get_users(request):
        users = User.objects.all()
        data = UserSerializer(users, many=True)
        return Response(data.data)

    # return Response({"status":"error"}, status.HTTP_400_BAD_REQUEST)