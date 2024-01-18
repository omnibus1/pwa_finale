import { Component, OnInit } from '@angular/core';
import { DataProviderService } from '../../../services/data-provider.service';
import { User } from '../../../Klasy/User';
@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent implements OnInit{

  users:User[]
  userMap = new Map<string,string>()
  newRoles:User[] = []
  constructor(private dataProvider:DataProviderService){}

  ngOnInit(): void {
    this.dataProvider.getUsers().subscribe(
      val=>{this.users = val as User[]
        console.log(val)
      for(let user of this.users){
        this.userMap.set(user.email, user.group)
      }}
    )
  }

  zmienRole(event:any){
    let found = false
    for(let user of this.newRoles){
      if(user.email == event.email){

        if(event.grupa == this.userMap.get(event.email)){
          this.newRoles.splice(this.newRoles.indexOf(user),1)
        }
        else{
          this.newRoles[this.newRoles.indexOf(user)] = event
        }
        found = true
      }
    }
    if(!found){
      this.newRoles.push(event)
    }
  }


  updateRoles(){
    this.dataProvider.updateRoles(this.newRoles).subscribe(
      val=>window.location.reload(),
      error=>console.log(error)
    )
  }
}
