import { Component, Input } from '@angular/core';
import { KupionaWycieczka } from '../../../Klasy/KupionaWycieczka';

@Component({
  selector: 'app-historia-item',
  templateUrl: './historia-item.component.html',
  styleUrl: './historia-item.component.css'
})
export class HistoriaItemComponent {
@Input() kupionaWycieczka:KupionaWycieczka

}
