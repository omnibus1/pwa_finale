import { Component, Input, Output, EventEmitter} from '@angular/core';
import { Wycieczka } from '../../../Klasy/Wycieczka';


@Component({
  selector: 'app-koszyk-item',
  templateUrl: './koszyk-item.component.html',
  styleUrl: './koszyk-item.component.css'
})
export class KoszykItemComponent {

@Input() wycieczka:Wycieczka
@Input() displayPrice:string
@Input() ilosc:number
@Output() updateCount = new EventEmitter<any>()
@Output() toggleSelect = new EventEmitter<Wycieczka>()
@Output() kupWycieczke = new EventEmitter<Wycieczka>()


getCountValues(){
  let stop = this.wycieczka.maxIloscMiejsc-this.wycieczka.iloscZajetychMiejsc
  let x =Array.from(
  { length: (stop - 1) / 1 + 2 },
  (value, index) => 0 + index * 1)
  return x
}

changeCount(event:any){
  let newCount = Number(event.target.value)
  // console.log(newCount)
  this.updateCount.emit([newCount, this.wycieczka])
}
toggleCheckbox(){
  this.toggleSelect.emit(this.wycieczka)
}


}
