import { Component } from '@angular/core';
import { AuthServiceService } from '../../../services/auth-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error:boolean=false;
  constructor(private authService:AuthServiceService, private router:Router){}

  login() {
    this.authService.loginUser(this.email, this.password).subscribe(
      (val:any)=>{
        this.authService.setUserEmail(val.email)
        this.authService.setGroup(val.group)
        this.authService.setToken(val.token)
        this.router.navigate(['home'])
      },
      error=> this.error = true
    )
  }
}
