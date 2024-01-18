from django.contrib import admin
from .models import *
# Register your models here.

@admin.register(Wycieczka)
class WycieczkaAdmin(admin.ModelAdmin):
    list_display = ["nazwa", "dataRozpoczecia", "dataZakonczenia","iloscZajetychMiejsc","maxIloscMiejsc"]
    # list_display = [field.name for field in Wycieczka._meta.get_fields()]

@admin.register(KupionaWycieczka)
class KupionaWycieczkaAdmin(admin.ModelAdmin):
    list_display = [field.name for field in KupionaWycieczka._meta.get_fields()]


@admin.register(Komentarz)
class KomentarzAdmin(admin.ModelAdmin):
    # list_display = [field.name for field in Komentarz._meta.get_fields()]
    list_display = ["email", "tekst", "nazwa", "data"]

@admin.register(KaruzelaZdjec)
class KaruzelaZdjecAdmin(admin.ModelAdmin):
    list_display = ["zdjecie"]
