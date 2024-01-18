import { Component, Input, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { DataProviderService } from '../../../services/data-provider.service';
import { Wycieczka } from '../../../Klasy/Wycieczka';
import { AuthServiceService } from '../../../services/auth-service.service';
import { FormControl } from '@angular/forms';
import { User } from '../../../Klasy/User';
@Component({
  selector: 'app-wycieczka-page',
  templateUrl: './wycieczka-page.component.html',
  styleUrl: './wycieczka-page.component.css'
})
export class WycieczkaPageComponent implements OnInit {
userGroup:string=""
id:number=0
wycieczka:Wycieczka
error:boolean=false
currency:string="Zł"
email:string=""
komentarz:string=""
dataZakupu:Date
nazwa:string=""
ratingControl = new FormControl(0)
nazwaError:boolean = false
tekstError:boolean = false
canRate:boolean = false

slides: any[] = new Array(3).fill({id: -1, src: '', title: '', subtitle: ''});
constructor(private route: ActivatedRoute, private dataProvider:DataProviderService, private authService:AuthServiceService){
  this.route.params.subscribe((param:any) => this.id = param.id)
}
ngOnInit(): void {
  this.dataProvider.getWycieczka(this.id).subscribe(
    (val:any)=>{this.wycieczka = val as Wycieczka,
      this.canRate = val.canRate
    this.getCarouselPhotos()}, 
    error=>this.error=true
  )
  this.dataProvider.getCurrency().subscribe(
    val=>this.currency=val as string
  )
  this.authService.getUserEmail().subscribe(
    val=>this.email=val
  )
  this,this.authService.getUserGroup().subscribe(
    val=>{this.userGroup = val
    console.log(val)}
  )
  
}

getCarouselPhotos(){
  let res = []
  for(let zdjecie of this.wycieczka.karuzelaZdjec){
    res.push(zdjecie.zdjecie)
  }
  return res
}
getDisplayPrice(){
  const price = this.dataProvider.calculatePriceFromCurrency(this.wycieczka.cena, this.currency)
  return price + this.currency
}

getCount(){
  return this.dataProvider.getBasketCount(this.wycieczka)
}
dodajWycieczkeDoKoszyka(){
  this.dataProvider.addToBasket(this.wycieczka)
}

usunWycieczkeZKoszyka(){
  this.dataProvider.removeFromBasket(this.wycieczka)
}

canAdd(){
  return this.getCount()+this.wycieczka.iloscZajetychMiejsc<this.wycieczka.maxIloscMiejsc
}
canRemove(){
 return this.getCount()>0
}

iloscWolnychMiejsc(){
 return this.wycieczka.maxIloscMiejsc - this.wycieczka.iloscZajetychMiejsc - this.getCount()
}
dodajKomentarz(){
  let dane = {data:this.dataZakupu, tekst:this.komentarz, email:this.email, nazwa:this.nazwa, id:this.id}
  this.nazwaError=false
  this.tekstError=false
  if(dane.nazwa==""){
    this.nazwaError=true
  }
  if(dane.tekst.length>500 || dane.tekst.length<50){
    this.tekstError=true
  }
  if(this.tekstError || this.nazwaError){
    return
  }
  this.dataProvider.dodajKomentarz(dane).subscribe(
    val=>this.ngOnInit()
  )
}
changeRating(rating:number){
  this.dataProvider.dodajOcene(rating, this.email, this.id).subscribe(
    val=>this.ngOnInit()
  )
}
usunKomentarz(id:number){
  this.dataProvider.usunKomentarz(id).subscribe(
    val=>this.ngOnInit(),
    error => console.log(error)
  );

}
getKomentarzById(id:number){
  for(let komentarz of this.wycieczka.komentarze){
    if(komentarz.id == id){
      return komentarz
    }
  }
  return null
}

zbanujUzytkownika(id:number){
  let komentarz = this.getKomentarzById(id);
  if(komentarz){
    console.log(komentarz.email,":::::::::::::::::")
    let new_role = {email:komentarz.email, grupa:"Banned"}
    this.dataProvider.updateRoles([new_role]).subscribe(
      val=>console.log(val),
      error => console.log(error)
    )
  }
  
}


}
