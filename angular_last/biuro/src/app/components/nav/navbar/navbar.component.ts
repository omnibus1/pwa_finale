import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../../services/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  email:string=""
  isLoggedIn:boolean=false
  userGroup:string=""
  constructor(private authService:AuthServiceService){
  }

  ngOnInit(): void {
    this.authService.getUserEmail().subscribe(
      val=>this.email = val
    )
    this.authService.isLoggedIn().subscribe(
      val=>this.isLoggedIn = val
    )
    this.authService.getUserGroup().subscribe(
      val=>this.userGroup = val
    )
  }
  canAccess(site:string){
    return this.authService.canAccess(this.userGroup,site)
  }

  logout(){
    this.authService.logout()
  }
  
}
