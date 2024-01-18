import { Component, OnInit } from '@angular/core';
import { DataProviderService } from '../../../services/data-provider.service';
import { KupionaWycieczka } from '../../../Klasy/KupionaWycieczka';

@Component({
  selector: 'app-historia-page',
  templateUrl: './historia-page.component.html',
  styleUrl: './historia-page.component.css'
})
export class HistoriaPageComponent implements OnInit{
  kupioneWycieczki:KupionaWycieczka[] = []
  filtry:string = ""
  constructor(private dataProvider:DataProviderService){}

  ngOnInit(): void {
    this.dataProvider.getKupioneWycieczki().subscribe(
      val=>this.kupioneWycieczki = val as KupionaWycieczka[]
    )
  }
  zmienFiltry(name:string){
    if(this.filtry==name){
      this.filtry = ""
    }
    else{
      this.filtry = name
    }
    
  }
}
