import { Component, OnInit } from '@angular/core';
import { DataProviderService } from '../../../services/data-provider.service';
import { Wycieczka } from '../../../Klasy/Wycieczka';
import { AuthServiceService } from '../../../services/auth-service.service';
@Component({
  selector: 'app-koszyk-page',
  templateUrl: './koszyk-page.component.html',
  styleUrl: './koszyk-page.component.css'
})
export class KoszykPageComponent implements OnInit {
  currency:string="Zł"
  wycieczki:Map<Wycieczka, number>
  email:string=""
  wybraneWycieczki:Map<Wycieczka, number>

  constructor(private dataService :DataProviderService, private authService:AuthServiceService){}

  ngOnInit(){
    this.dataService.getCurrency().subscribe(
      val=>this.currency=val as string
    )
  
    this.dataService.getFromBasket().subscribe(
      val=>{this.wycieczki = val as Map<Wycieczka, number>
      this.wybraneWycieczki = new Map(val)
      }
    )

    this.authService.getUserEmail().subscribe(
      val=>this.email = val
    )
  }

  getArrayOfWycieczki(){
    return Array.from(this.wycieczki.keys())
  }
  getCountOfWycieczka(wyieczka:Wycieczka){
    return this.wycieczki.get(wyieczka)!
  }

  updateWycieczkaCount(val:any){
    this.dataService.changeBasketCount(val[1], val[0])
  }

  calculateSubtotal(){
    let total = 0
    for(let wycieczka of Array.from(this.wybraneWycieczki.keys())){
      total+=wycieczka.cena*this.wycieczki.get(wycieczka)!

    }
    total = this.dataService.calculatePriceFromCurrency(total, this.currency)
    total = total? total:0
    return total+this.currency

  }

  toggleSelectWycieczka(wycieczka:Wycieczka){
    if(this.wybraneWycieczki.has(wycieczka)){
      this.wybraneWycieczki.delete(wycieczka)
    }
    else{
      this.wybraneWycieczki.set(wycieczka, this.wycieczki.get(wycieczka)!)
    }
  }

  getDisplayPrice(wycieczka:Wycieczka){
    const count = this.getCountOfWycieczka(wycieczka)
    const cena = wycieczka.cena
    return this.dataService.calculatePriceFromCurrency(cena*count, this.currency)+this.currency
  }
  kupWszystko(){

    this.dataService.checkoutWycieczki(this.wybraneWycieczki,this.email)
  }
}
