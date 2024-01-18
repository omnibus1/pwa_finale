import { Component, OnInit } from '@angular/core';
import { DataProviderService } from '../../../services/data-provider.service';
import { Wycieczka } from '../../../Klasy/Wycieczka';
import { AuthServiceService } from '../../../services/auth-service.service';
import { WycieczkaPipe } from '../../../pipes/wycieczka-pipe';
import { Options } from '@angular-slider/ngx-slider';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-wycieczki-page',
  templateUrl: './wycieczki-page.component.html',
  styleUrl: './wycieczki-page.component.css'
})
export class WycieczkiPageComponent implements OnInit{
  wycieczki:Wycieczka[] = []
  currency:string = "Zł"
  enableButtons:boolean=false;
  nameFilter:string=""
  selectedLower=0
  selectedUpper=0
  ratingLower = 0
  ratingUpper=5
  selectedCountries:Array<string> = new Array();
  selectedNumber:number = 1


    start:Date
    end:Date


  value: number = 100;
  options: Options = {
    floor: 0,
    ceil: 200
  };


  constructor(private dataProvider:DataProviderService, private authProvider:AuthServiceService){}

  ngOnInit(): void {
    this.dataProvider.getWycieczki().subscribe(
      val=>{
        this.wycieczki = val as Wycieczka[]
        this.selectedLower = this.getWycieczkiMinPrice()
        this.selectedUpper = this.getWycieczkiMaxPrice()
      }
    )
    this.dataProvider.getCurrency().subscribe(
      val=>{this.currency = val
      }
    )
    this.authProvider.isLoggedIn().subscribe(
      val=>this.enableButtons = val
    )
  }

  getCount(wycieczka:Wycieczka){
    return this.dataProvider.getBasketCount(wycieczka)
  }
  dodajWycieczkeDoKoszyka(wycieczka:Wycieczka){
    this.dataProvider.addToBasket(wycieczka)
  }

  usunWycieczkeZKoszyka(wycieczka:Wycieczka){
    this.dataProvider.removeFromBasket(wycieczka)
  }

  getDisplayPrice(wycieczka:Wycieczka){
    const price = this.dataProvider.calculatePriceFromCurrency(wycieczka.cena, this.currency)
    return price+this.currency
  }

  getCountryList(){
    let res:string[] = []
    this.wycieczki.forEach(wycieczka=>{
      if(!res.includes(wycieczka.kraj)){
        res.push(wycieczka.kraj)
      }
      
    })
    return res;
  }
  changeCoutryFilters(country:any, checked:any){
    if(this.selectedCountries.includes(country)){
      this.selectedCountries = this.selectedCountries.filter(val=>val!=country)
    }
    else{
      this.selectedCountries.push(country)
    }
  }

  handleSliderChange(event:any){
    // console.log(event)
  }
  getWycieczkiMaxPrice(){
    let res:number= 0
    this.wycieczki.forEach(wycieczka=>{
      if(res==null){
        res = wycieczka.cena;
      }
      else{
        if(wycieczka.cena>res){
          res=wycieczka.cena
        }
      }
    })
    return Math.ceil(this.dataProvider.calculatePriceFromCurrency(res, this.currency))
  }

  getWycieczkiMinPrice(){
    let res:number=10000
    this.wycieczki.forEach(wycieczka=>{
      if(res==null){
        res = wycieczka.cena;
      }
      else{
        if(wycieczka.cena<res){
          res=wycieczka.cena
        }
      }
    })
    return Math.floor(this.dataProvider.calculatePriceFromCurrency(res, this.currency))
  }


  getPriceRange(){
    return [this.currencyScalar(this.selectedLower), this.currencyScalar(this.selectedUpper)]
  }
  currencyScalar(val:number){
    if(this.currency == "$"){
      return val*4
    }
    if(this.currency == "€"){
      return val*4
    }
    if(this.currency == "£"){
      return val*5
    }
    return val
  }

  getDateRange(){
    return [this.start, this.end]
  }

  getRatingRange(){
    return [this.ratingLower, this.ratingUpper]
  }

  clearFilters(){
    window.location.reload();
  }
  najtansza(wycieczka:Wycieczka){
    let minPrice;
    for(let w of this.wycieczki){
      if(minPrice==null || w.cena<minPrice){
        minPrice=w.cena
      }
    }
    return wycieczka.cena==minPrice
  }
  najdrozsza(wycieczka:Wycieczka){
    let maxPrice;
    for(let w of this.wycieczki){
      if(maxPrice==null || w.cena>maxPrice){
        maxPrice=w.cena
      }
    }
    return wycieczka.cena==maxPrice
  }
}
