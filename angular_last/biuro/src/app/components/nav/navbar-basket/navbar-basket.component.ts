import { Component, OnInit } from '@angular/core';
import { Wycieczka } from '../../../Klasy/Wycieczka';
import { DataProviderService } from '../../../services/data-provider.service';
@Component({
  selector: 'app-navbar-basket',
  templateUrl: './navbar-basket.component.html',
  styleUrl: './navbar-basket.component.css'
})
export class NavbarBasketComponent implements OnInit{

  currency:string
  wycieczkiWKoszyku: Map<Wycieczka, number> = new Map<Wycieczka, number>

constructor(private dataService :DataProviderService){


}

ngOnInit(){
  this.dataService.getCurrency().subscribe(
    curr => this.currency = curr as string
  )
  this.dataService.getFromBasket().subscribe(
    wycieczki => this.wycieczkiWKoszyku = wycieczki as Map<Wycieczka, number>
  )
}
totalPrice(){
  var totalPrice=0
  for(let wycieczka of Array.from(this.wycieczkiWKoszyku.keys()) ){
    totalPrice+=wycieczka.cena*this.wycieczkiWKoszyku.get(wycieczka)!
  }

  return this.dataService.calculatePriceFromCurrency(totalPrice, this.currency)
}
getNumOfItems(){
  var num=0
  for(let wycieczka of Array.from(this.wycieczkiWKoszyku.keys())){
    num+=this.wycieczkiWKoszyku.get(wycieczka)!
  }
  return num
}


}
