import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../../Klasy/User';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrl: './user-item.component.css'
})
export class UserItemComponent {
  selectedRole:string=""
  zmienione:boolean=false
  @Input() user:User
  @Output() roleChange = new EventEmitter<any>()


  changeGroup(event:any){
    this.selectedRole = event.target.value
    this.zmienione = true
    this.roleChange.emit({email:this.user.email,grupa:this.selectedRole})
  }


}
