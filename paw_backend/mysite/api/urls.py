
from django.contrib import admin
from django.urls import path, include
from .views import  *
from .authenticate import *
urlpatterns = [
    path("login/", login),
    path("register/", register_user),
    path("wycieczki/", WycieczkiEndpoint.as_view()),
    path('wycieczka/',get_wycieczka),
    path("kupione_wycieczki/", KupioneWycieczki.as_view()),
    path('komentarze/', KomentarzeView.as_view()),
    path('users/', get_users),
    path('oceny/', dodaj_ocene),
    path('grupy/',update_grupy),
]
