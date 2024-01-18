import { Component, OnInit } from '@angular/core';
import { DataProviderService } from '../../../services/data-provider.service';
import { Wycieczka } from '../../../Klasy/Wycieczka';


@Component({
  selector: 'app-manage-page',
  templateUrl: './manage-page.component.html',
  styleUrl: './manage-page.component.css'
})
export class ManagePageComponent implements OnInit {
  wycieczki:Wycieczka[]
  constructor(private dataProvider:DataProviderService){}

  ngOnInit(): void {
    this.dataProvider.getWycieczki().subscribe(
      val=>this.wycieczki = val as Wycieczka[]
    )
  }
  usunWycieczke(id:number){
    this.dataProvider.usunWycieczke(id).subscribe(
      val=>this.ngOnInit(),
      error=>console.log(error)
    )
  }

}
