import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Wycieczka } from '../Klasy/Wycieczka';
import { Subject, of, BehaviorSubject } from 'rxjs';import { AuthServiceService } from './auth-service.service';
import { User } from '../Klasy/User';
@Injectable({
  providedIn: 'root'
})
export class DataProviderService {
  wycieczkiWKoszyku = new Map<Wycieczka, number>()
  basketItems = new Subject()
  token = this.authService.token.getValue()
  currency: BehaviorSubject<string> = new BehaviorSubject<string>("Zł");
  headers:Headers
  constructor(private http:HttpClient, private authService:AuthServiceService) { }

  getHeaders(){
    return new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization':this.authService.token.getValue()});
  }

  setCurrency(newCurrency:string){
    sessionStorage.setItem("currency", newCurrency)
    this.currency.next(newCurrency)
  }

  getCurrency(){
    return this.currency.asObservable()
  }

  getWycieczki(){
    const url = environment.apiUrl+"wycieczki/"
    const headers = this.getHeaders()
    return this.http.get(url,{headers})
  }

  getBasketCount(wycieczka:Wycieczka){
    wycieczka = this.getById(wycieczka)
    if(this.wycieczkiWKoszyku.has(wycieczka)){
      return this.wycieczkiWKoszyku.get(wycieczka)!
    }
    return 0
  }

  getById(wycieczka:Wycieczka){
    for( let w of Array.from(this.wycieczkiWKoszyku.keys())){
      if(w.id === wycieczka.id){
        wycieczka=w
      }
    }
    return wycieczka
  }

  addToBasket(wycieczka:Wycieczka){
    wycieczka = this.getById(wycieczka)
    if(!this.wycieczkiWKoszyku.has(wycieczka)){
      this.wycieczkiWKoszyku.set(wycieczka,1)
    }
    else{
      this.wycieczkiWKoszyku.set(wycieczka, this.wycieczkiWKoszyku.get(wycieczka)!+1)
    }
    this.basketItems.next(this.wycieczkiWKoszyku)
  }

  removeFromBasket(wycieczka:Wycieczka){
    wycieczka = this.getById(wycieczka)

    let newCount = this.wycieczkiWKoszyku.get(wycieczka)!-1
    if(newCount===0){
      this.wycieczkiWKoszyku.delete(wycieczka)
    }
    else{
      this.wycieczkiWKoszyku.set(wycieczka, newCount)
    }
    this.basketItems.next(this.wycieczkiWKoszyku)
  }
  getFromBasket(){
    return of(this.wycieczkiWKoszyku)
  }

  calculatePriceFromCurrency(price:number, currency:string){
    if(currency=="€"){
      return price/4
    }
    if(currency=="$"){
      return price/4
    }
    if(currency=="£"){
      return price/5
    }
    return price
  }

  changeBasketCount(wycieczka:Wycieczka, newCount:number){
    wycieczka = this.getById(wycieczka)
    if(newCount===0){
      this.wycieczkiWKoszyku.delete(wycieczka)
    }
    else{
      this.wycieczkiWKoszyku.set(wycieczka, newCount)
    }
  }
  checkoutWycieczki(wycieczki:Map<Wycieczka, number>, email:string){
    const endpointUrl = environment.apiUrl + "kupione_wycieczki/"
    const headers = this.getHeaders()

    wycieczki.forEach((value, key)=>{
      this.changeBasketCount(key,0)
      console.log(key.id, email)
      const data={id:key.id, ilosc:value,email:email}

      this.http.post(endpointUrl, data, {headers}).subscribe(

        val=>console.log(val),
        error=>console.log(error)
      )
    })
  }
  getKupioneWycieczki(){
    const endpointUrl = environment.apiUrl + "kupione_wycieczki/?email="+this.authService.userEmail.getValue()
    const headers = this.getHeaders()

    return this.http.get(endpointUrl, {headers})
  }

  getWycieczka(wycieczkaId:number){
    const endpointUrl = environment.apiUrl + "wycieczka/?id="+wycieczkaId
    const headers = this.getHeaders()
    return this.http.get(endpointUrl,  {headers})
  }

  dodajKomentarz(dane:any){
    const endpointUrl = environment.apiUrl + "komentarze/"
    const headers = this.getHeaders()

    return this.http.post(endpointUrl, dane, {headers})
  }

  dodajOcene(ocena:number, email:string, idWycieczki:number){

    const endpointUrl = environment.apiUrl + "oceny/"
    const headers = this.getHeaders()
    const data = {email:email, wartosc:ocena, id:idWycieczki}
    return this.http.post(endpointUrl, data, {headers})
  }

  getUsers(){
    const endpointUrl = environment.apiUrl + "users/"
    const headers = this.getHeaders()
    return this.http.get(endpointUrl, {headers})
  }

  updateWycieczka(id:number, data:any){
    const endpointUrl = environment.apiUrl + "wycieczki/"
    const headers = this.getHeaders()
    data.id = id
    return this.http.put(endpointUrl, data, {headers})
  }
  createWycieczka(dane:any){
    const endpointUrl = environment.apiUrl + "wycieczki/"
    const headers = this.getHeaders()
    return this.http.post(endpointUrl,dane,{headers})
  }

  usunWycieczke(id:number){
    const endpointUrl = environment.apiUrl + "wycieczki/?id="+id
    const headers = this.getHeaders()
    return this.http.delete(endpointUrl, {headers})
  }

  updateRoles(roleArray:any[]){
    const endpointUrl = environment.apiUrl + "grupy/"
    const headers = this.getHeaders()
    return this.http.post(endpointUrl, roleArray, {headers})
  }
  usunKomentarz(id:number){
    const endpointUrl = environment.apiUrl + "komentarze/?id="+id
    const headers = this.getHeaders()
    return this.http.delete(endpointUrl, {headers})
  }

}
