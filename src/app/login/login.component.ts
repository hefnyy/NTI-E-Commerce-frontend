import { Component, OnDestroy } from '@angular/core';
import { AuthenaticationsService } from '../services/authenatications.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { Login } from '../interfaces/authenatications';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent   {
  logo: string = "logo/Top-Ecommerce-Websites.jpg";
  invalidLogin:string='';
  subscription:any;

  constructor(private _AuthenaticationsServices: AuthenaticationsService, private _Router: Router) { }

  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
  })

  login(formData:FormGroup){
    this.subscription = this._AuthenaticationsServices.login(formData.value).subscribe((res) => {
      if(res.token){
        localStorage.setItem('userToken',res.token);
        this._AuthenaticationsServices.saveLoggedInUser();
      }
      this._Router.navigate(['/home'])
      
    },
    (err) => {
      this.invalidLogin = err.error.message;
    })
  }
}
