import { Component } from '@angular/core';
import { DataProviderService } from '../../../services/data-provider.service';
@Component({
  selector: 'app-currency-changer',
  templateUrl: './currency-changer.component.html',
  styleUrl: './currency-changer.component.css'
})
export class CurrencyChangerComponent {
  service:DataProviderService


  constructor(private dataService :DataProviderService){
    this.service = dataService
  }

  changeCurrency(event:any){
    let newCurrency:string = event.target.value
    this.service.setCurrency(newCurrency)
  }


}
