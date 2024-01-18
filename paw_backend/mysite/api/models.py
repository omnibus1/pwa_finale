from django.db import models
from django.contrib.auth.models import User
from datetime import datetime
# Create your models here.

class Komentarz(models.Model):
    email = models.CharField(max_length=255)
    tekst = models.CharField(max_length=500)
    nazwa = models.CharField(max_length=255)
    data = models.DateField(null=True)

class KaruzelaZdjec(models.Model):
    zdjecie = models.CharField(max_length=255)

class Ocena(models.Model):
    email = models.CharField(max_length=255)
    wartosc = models.IntegerField()

class Wycieczka(models.Model):
    nazwa = models.CharField(max_length=255)
    kraj = models.CharField(max_length=255)
    dataRozpoczecia = models.DateField()
    dataZakonczenia = models.DateField()
    maxIloscMiejsc = models.IntegerField()
    iloscZajetychMiejsc = models.IntegerField()
    cena = models.IntegerField()
    zdjecie = models.CharField(max_length=255)
    opis = models.CharField(max_length=255)
    komentarze = models.ManyToManyField(Komentarz, blank=True)
    karuzelaZdjec = models.ManyToManyField(KaruzelaZdjec, blank=True)
    oceny = models.ManyToManyField(Ocena, null=True)

    def __str__(self):
        return self.nazwa

    def status(self):

        if (self.dataRozpoczecia > datetime.now().date()):
            return "oczekuje"
        if (self.wycieczka.dataRozpoczecia < datetime.now().date() and self.wycieczka.dataZakonczenia > datetime.now().date()):
            return "realizacja"

        return "zrealizowana"

class KupionaWycieczka(models.Model):
    email = models.CharField(max_length=255)
    wycieczka = models.ForeignKey(Wycieczka, on_delete=models.CASCADE)
    ilosc = models.IntegerField()
    dataKupienia = models.DateField()



class StoredToken(models.Model):
    tokenValue = models.CharField(max_length=512)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class SessionPersistance(models.Model):
    sessionType = models.CharField(max_length=255)

