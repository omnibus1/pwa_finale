import { Component, Input, Output, EventEmitter} from '@angular/core';
import { Wycieczka } from '../../../Klasy/Wycieczka';

@Component({
  selector: 'app-wycieczka-manage-item',
  templateUrl: './wycieczka-manage-item.component.html',
  styleUrl: './wycieczka-manage-item.component.css'
})
export class WycieczkaManageItemComponent {

  @Input() wycieczka:Wycieczka
  @Output() usun = new EventEmitter<number>()

  usunWycieczke(){
    this.usun.emit(this.wycieczka.id)
  }

}
