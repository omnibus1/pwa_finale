import { Component } from '@angular/core';
import { AuthServiceService } from '../../../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  error:boolean = false;
  constructor(private authService:AuthServiceService, private router:Router){}

  register() {
    console.log(this.email, this.password)
    this.authService.registerUser(this.email, this.password).subscribe(
      (val:any)=>{
        this.router.navigate(["login"])
      },

      error=>this.error = true
    )
  }
}
