import { Component, Input, OnInit } from '@angular/core';
import { DataProviderService } from '../../services/data-provider.service';
import { AuthServiceService } from '../../services/auth-service.service';
import { Wycieczka } from '../../Klasy/Wycieczka';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})

export class PaginationComponent implements OnInit {
  @Input() wycieczki: Wycieczka[] = [];
  @Input() itemsPerPage: number = 5;
  currentPage: number = 1;
  currency:string = "Zł"
  enableButtons:boolean=false;
  
  onInputChange(newValue:any){
    console.log("asd")
    this.currentPage = 1
  }

  constructor(private dataProvider:DataProviderService, private authProvider:AuthServiceService){}

  ngOnInit(): void {
    this.dataProvider.getCurrency().subscribe(
      val=>{this.currency = val
      }
    )
    this.authProvider.isLoggedIn().subscribe(
      val=>this.enableButtons = val
    )
  }

  get paginatedItems(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.wycieczki.slice(startIndex, endIndex);
  }

  setPage(pageNumber: number): void {
    this.currentPage = pageNumber;
  }
  getPageNumbers(): number[] {
    const pageCount = Math.ceil(this.wycieczki.length / this.itemsPerPage);
    return Array(pageCount).fill(0).map((_, index) => index + 1);
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
