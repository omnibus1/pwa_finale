from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User
from datetime import datetime


class KomentarzSerializer(serializers.ModelSerializer):
    group = serializers.SerializerMethodField()
    class Meta:
        model = Komentarz
        ordering = ['-id']
        fields = ('email', 'tekst', 'nazwa', 'data', 'id', 'group')

    def get_group(self, obj):
        x=123
        try:
            return User.objects.get(email=obj.email).groups.all()[0].name
        except:
            return "User"

class KaruzelaZdjecSerializer(serializers.ModelSerializer):
    class Meta:
        model = KaruzelaZdjec
        fields = ('zdjecie',)



class WycieczkaSerializer(serializers.ModelSerializer):
    sredniaOcena = serializers.SerializerMethodField()
    iloscOcen = serializers.SerializerMethodField()
    komentarze = KomentarzSerializer(many=True, read_only=True)
    karuzelaZdjec = KaruzelaZdjecSerializer(many=True, read_only=True)
    class Meta:
        model = Wycieczka
        fields = ['id','nazwa','kraj','dataRozpoczecia', 'dataZakonczenia', 'maxIloscMiejsc', 'iloscZajetychMiejsc',
                  'cena', 'zdjecie', 'opis', 'sredniaOcena','iloscOcen','komentarze', 'karuzelaZdjec']

    def get_komentarze(self, obj):
        komentarze = obj.komentarze.all().order_by("-id")
        return KomentarzSerializer(komentarze, many=True).data

    def get_sredniaOcena(self, obj):
        suma = 0
        for o in obj.oceny.all():
            suma += o.wartosc

        srednia = suma/len(obj.oceny.all()) if len(obj.oceny.all()) !=0 else 0
        return round(srednia, 2)
    def get_iloscOcen(self, obj):

        return len(obj.oceny.all())
class KupionaWycieczkaSerializer(serializers.ModelSerializer):
    status = serializers.SerializerMethodField()
    wycieczka = WycieczkaSerializer(many=False, read_only=True)
    class Meta:
        model = KupionaWycieczka
        fields = ['email', 'ilosc', 'dataKupienia', 'wycieczka', "status"]

    def get_status(self, obj):
        if(obj.wycieczka.dataRozpoczecia>datetime.now().date()):
            return "oczekuje"
        if(obj.wycieczka.dataRozpoczecia<datetime.now().date() and obj.wycieczka.dataZakonczenia>datetime.now().date()):
            return "realizacja"

        return "zrealizowana"

class UserSerializer(serializers.ModelSerializer):
    group = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ["email", "group"]

    def get_group(self, obj):
        if len(obj.groups.all()) >= 1:
            return obj.groups.all()[0].name
        return ""
