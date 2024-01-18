import { CanActivateFn } from '@angular/router';
import { Injectable, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { Router, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements OnInit{
  isLoggedIn:boolean
  email:string
  userGroup:string
  constructor(public authService: AuthServiceService, public router: Router) {
    this.isLoggedIn = false
    this.email=""
    this.userGroup = ""
    this.authService.isLoggedIn().subscribe(
      val=>{this.isLoggedIn = val}
    )
    this.authService.getUserEmail().subscribe(
      val=>this.email = (val as unknown) as string
    )

    this.authService.getUserGroup().subscribe(
      val=>this.userGroup = val
    )

  }
  ngOnInit(): void {

  }
   canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ){
    let nextUrl = state.url

    if(this.authService.canAccess(this.userGroup, nextUrl)){
      return true
    }
    else{
      return this.router.navigate(["login"])
    }


  }
}