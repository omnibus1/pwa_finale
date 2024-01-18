from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes
from rest_framework import generics
from .serializers import *
from rest_framework import mixins
from rest_framework import status
import datetime
from .authenticate import UserAuthenitcation
from django.contrib.auth.models import Group
import jwt
# Create your views here.


class WycieczkiEndpoint(generics.GenericAPIView, mixins.ListModelMixin):
    serializer_class = WycieczkaSerializer
    queryset = Wycieczka.objects.all()
    authentication_classes = [UserAuthenitcation]

    def get_queryset(self):
        return Wycieczka.objects.all()

    def get(self, request, *args, **kwargs):
        serializer = WycieczkaSerializer(Wycieczka.objects.all(), many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        try:
            nazwa = request.data["nazwa"]
            kraj = request.data["kraj"]
            opis = request.data["opis"]
            dataRozpoczecia = request.data["dataRozpoczecia"]
            dataZakonczenia = request.data["dataZakonczenia"]
            maxIloscMiejsc = request.data["maxIloscMiejsc"]
            iloscZajetychMiejsc = request.data["iloscZajetychMiejsc"]
            cena = request.data["cena"]
            zdjecie_glowne = request.data["zdjecie"]

            zdjecia = []
            for zdjecie in request.data["karuzelaZdjec"]:
                karuzela = KaruzelaZdjec(zdjecie=zdjecie["zdjecie"])
                zdjecia.append(karuzela)
                karuzela.save()
            wycieczka = Wycieczka(nazwa=nazwa, kraj=kraj, opis=opis, dataRozpoczecia=dataRozpoczecia, dataZakonczenia=dataZakonczenia,
                                  maxIloscMiejsc=maxIloscMiejsc, iloscZajetychMiejsc=iloscZajetychMiejsc,cena=cena,zdjecie=zdjecie_glowne)

            wycieczka.save()
            for z in zdjecia:
                wycieczka.karuzelaZdjec.add(z)

            return Response({"status": "success"})
        except:
            return Response ({"status": "error"}, status.HTTP_400_BAD_REQUEST)

    def put(self, request, *args, **kwargs):
        try:
            id = request.data["id"]
            nazwa = request.data["nazwa"]
            kraj = request.data["kraj"]
            opis = request.data["opis"]
            dataRozpoczecia = request.data["dataRozpoczecia"]
            dataZakonczenia = request.data["dataZakonczenia"]
            maxIloscMiejsc = request.data["maxIloscMiejsc"]
            iloscZajetychMiejsc = request.data["iloscZajetychMiejsc"]
            cena = request.data["cena"]
            zdjecie_glowne = request.data["zdjecie"]

            zdjecia_w_karuzeli = []
            for val in request.data["karuzelaZdjec"]:
                zdjecie = val["zdjecie"]
                if KaruzelaZdjec.objects.filter(zdjecie=zdjecie).exists():
                    zdjecia_w_karuzeli.append(KaruzelaZdjec.objects.get(zdjecie=zdjecie))
                else:
                    nowe_zdjecie = KaruzelaZdjec(zdjecie=zdjecie)
                    zdjecia_w_karuzeli.append(nowe_zdjecie)
                    nowe_zdjecie.save()

            wycieczka = Wycieczka.objects.get(id=id)
            wycieczka.karuzelaZdjec.clear()
            for zjdecie_w_karuzeli in zdjecia_w_karuzeli:
                wycieczka.karuzelaZdjec.add(zjdecie_w_karuzeli)
            wycieczka.nazwa = nazwa
            wycieczka.kraj = kraj
            wycieczka.cena = cena
            wycieczka.opis = opis
            wycieczka.dataZakonczenia = dataZakonczenia
            wycieczka.dataRozpoczecia = dataRozpoczecia
            wycieczka.maxIloscMiejsc = maxIloscMiejsc
            wycieczka.iloscZajetychMiejsc = iloscZajetychMiejsc
            wycieczka.zdjecie = zdjecie_glowne
            wycieczka.save()

            return Response({"status": "success"})
        except:
            return Response({"status": "error"}, status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        try:
            id = request.query_params.get("id", "")
            wycieczka = Wycieczka.objects.get(id=id)
            wycieczka.delete()
            return Response({"status":"success"})
        except:
            return Response({"status": "error"}, status.HTTP_400_BAD_REQUEST)

class KupioneWycieczki(generics.GenericAPIView, mixins.ListModelMixin):
    serializer_class = KupionaWycieczkaSerializer
    queryset = KupionaWycieczka.objects.all()
    authentication_classes = [UserAuthenitcation]
    def get(self, request, *args, **kwargs):
        try:
            email = request.query_params.get("email","")
            serializer = KupionaWycieczkaSerializer(KupionaWycieczka.objects.filter(email=email).order_by('-id'), many=True)
            return Response(serializer.data)
        except:
            return Response({"status":"error"}, status.HTTP_400_BAD_REQUEST)

    def post(self, request, *args, **kwargs):
        try:
            id = request.data["id"]
            email = request.data["email"]
            ilosc = request.data["ilosc"]

            wycieczka = Wycieczka.objects.get(id=id)
            wycieczka.iloscZajetychMiejsc += ilosc
            wycieczka.save()
            kupionaWycieczka = KupionaWycieczka(email=email, ilosc=ilosc, wycieczka=wycieczka, dataKupienia=datetime.datetime.now())
            kupionaWycieczka.save()
            return Response({"succesfull": "saved"})
        except:
            return Response({"status":"error"}, status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
@authentication_classes([UserAuthenitcation])
def get_wycieczka(request):
    try:

        wycieczka_id = request.query_params.get("id", "")
        wycieczka = Wycieczka.objects.get(id=wycieczka_id)


        token = request.META.get('HTTP_AUTHORIZATION')
        payload = jwt.decode(token, "secret", algorithms="HS256")
        email=payload["username"]

        zrealizowana = False

        if KupionaWycieczka.objects.filter(wycieczka=wycieczka, email=email).exists():
            if wycieczka.dataZakonczenia< datetime.datetime.now().date():
                zrealizowana = True

        serializer = WycieczkaSerializer(wycieczka, many=False)
        res = serializer.data
        res["canRate"] = zrealizowana
        return Response(res)

    except:
        return Response({"status":"error"}, status.HTTP_400_BAD_REQUEST)


class KomentarzeView(generics.GenericAPIView, mixins.ListModelMixin):
    serializer_class = WycieczkaSerializer

    authentication_classes = [UserAuthenitcation]


    def get(self, request, *args, **kwargs):
        try:

            email = request.data["email"]
            nazwa = request.data["nazwa"]
            tekst = request.data["tekst"]
            data = request.data.get("data",None)
            id_wycieczki = request.data["id"]
            komentarz = Komentarz(email=email, nazwa=nazwa, tekst=tekst, data=data)
            komentarz.save()
            wycieczka = Wycieczka.objects.get(id=id_wycieczki)
            wycieczka.komentarze.add(komentarz)
            return Response({"OK"})
        except:
            return Response({"status":"error"}, status.HTTP_400_BAD_REQUEST)

    def post(self, request,  *args, **kwargs):
        try:
            email = request.data["email"]
            nazwa = request.data["nazwa"]
            tekst = request.data["tekst"]
            data = request.data.get("data", None)
            id_wycieczki = request.data["id"]
            komentarz = Komentarz(email=email, nazwa=nazwa, tekst=tekst, data=data)
            komentarz.save()
            wycieczka = Wycieczka.objects.get(id=id_wycieczki)
            wycieczka.komentarze.add(komentarz)
            return Response({"OK"})
        except:
            return Response({"status": "error"}, status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        komentarz_id = request.query_params.get("id")
        komentarz = Komentarz.objects.get(id=komentarz_id)
        komentarz.delete()
        return Response({"ASDA"})

@api_view(["POST"])
@authentication_classes([UserAuthenitcation])
def dodaj_ocene(request):
    try:
        email = request.data["email"]
        wartosc = request.data["wartosc"]
        id_wycieczki = request.data["id"]
        wycieczka = Wycieczka.objects.get(id=id_wycieczki)
        if any(w.email == email for w in wycieczka.oceny.all()):
            ocena = wycieczka.oceny.all().filter(email=email).get()
            ocena.wartosc = wartosc
            ocena.save()
        else:
            ocena = Ocena(email=email, wartosc=wartosc)
            ocena.save()
            wycieczka.oceny.add(ocena)
        return Response({"status":"succesfull"})
    except:
        return Response({"status":"error"}, status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
@authentication_classes([UserAuthenitcation])
def update_grupy(request):
    try:
        for row in request.data:
            user = User.objects.get(email=row["email"])
            user.groups.clear()
            group = Group.objects.get(name=row["grupa"])
            user.groups.add(group)


        users = User.objects.all()
        data = UserSerializer(users, many=True)
        return Response(data.data)
    except:
        return Response({"status":"error"}, status.HTTP_400_BAD_REQUEST)