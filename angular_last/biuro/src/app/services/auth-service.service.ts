import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { of, BehaviorSubject, Observable, map } from 'rxjs';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  userEmail: BehaviorSubject<string> = new BehaviorSubject<string>(this.getEmailFromSessionStorage());
  userGroup: BehaviorSubject<string> = new BehaviorSubject<string>(this.getGroupFromSessionStorage());
  token: BehaviorSubject<string> = new BehaviorSubject<string>(this.getTokenFromSessionStorkage());
  constructor(private http:HttpClient, private router:Router) {
  }

  canAccess(group:string, site:string){
    if(group===""){
      return false
    }
    if((group==="User" || group=="Banned") && (site==="/admin"||site==="/manage"||site.includes("edit_wycieczka"))){
      return false
    }
    if(group==="Manager"&&site==="/admin"){
      return false
    }
    return true
  }
  
  getEmailFromSessionStorage(){
    const possibleEmail = sessionStorage.getItem("email")
    return possibleEmail!==null? possibleEmail:""
  }
  getGroupFromSessionStorage(){
    const possibleGroup = sessionStorage.getItem("group")
    return possibleGroup!==null? possibleGroup:""
  }
  getTokenFromSessionStorkage(){
    const possibleToken = sessionStorage.getItem("token");
    return possibleToken!==null? possibleToken:""
  }
  setUserEmail(email:string){
    sessionStorage.setItem("email", email)
    this.userEmail.next(email);
   }
  setToken(token:string){
    console.log(token)
    sessionStorage.setItem("token", token)
    this.token.next(token)
  }
  
   getUserGroup(){
    return this.userGroup.asObservable()
   }

  setGroup(group:string){
    sessionStorage.setItem("group", group)
    this.userGroup.next(group)
  }

  logout(){
    sessionStorage.clear();
    this.userEmail.next("");
    this.userGroup.next("")
    this.token.next("")
    this.router.navigate(['login'])
  }

  getUserEmail(){
    return this.userEmail.asObservable()
  }

  isLoggedIn(){
    return this.userEmail.asObservable().pipe(map(val=> val!=""))
  }


  registerUser(email:string, password:string){
    const endpointUrl = environment.apiUrl + "register/"
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const data = {email:email, password:password}
    return this.http.post(endpointUrl, data,  {headers})
  }
 

  loginUser(email:string, password:string){
    const endpointUrl = environment.apiUrl + "login/"
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const data = {email:email, password:password}
    return this.http.post(endpointUrl,data, {headers})
  }

}
