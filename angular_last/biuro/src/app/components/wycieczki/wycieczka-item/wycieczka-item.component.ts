import { Component } from '@angular/core';
import { Input, Output, EventEmitter} from '@angular/core';
import { Wycieczka } from '../../../Klasy/Wycieczka';

@Component({
  selector: 'app-wycieczka-item',
  templateUrl: './wycieczka-item.component.html',
  styleUrl: './wycieczka-item.component.css'
})
export class WycieczkaItemComponent {
@Input() wycieczka:Wycieczka
@Input() ilosc:number
@Input() displayPrice:string

@Output() dodajDoKoszyka = new EventEmitter<Wycieczka>()
@Output() usunZKoszyka = new EventEmitter<Wycieczka>()
@Input() disableButtons:boolean=true


canAdd(){
   return this.ilosc+this.wycieczka.iloscZajetychMiejsc<this.wycieczka.maxIloscMiejsc
}
canRemove(){
  return this.ilosc>0
}
removeFromBasket(){
  this.usunZKoszyka.emit(this.wycieczka)
}
addToBasket(){
  this.dodajDoKoszyka.emit(this.wycieczka)
}
iloscWolnychMiejsc(){
  return this.wycieczka.maxIloscMiejsc - this.wycieczka.iloscZajetychMiejsc - this.ilosc
}

}
