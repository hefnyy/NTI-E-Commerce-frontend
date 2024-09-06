import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenaticationsService } from '../services/authenatications.service';
import { compileNgModule } from '@angular/compiler';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  constructor(private _AuthenaticationsServices: AuthenaticationsService,private _Router: Router,) { }

  signupForm = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phoneNumber: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]*$/)]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
  })

  emailErrors:string='';
  passwordErrors:string='';
  phoneNumberErrors:string='';

  signUp(formData: FormGroup) {
    // alert('sign up form')
    console.log(formData.value);
    this._AuthenaticationsServices.signUp(formData.value).subscribe((res) => {
      console.log(res.token);

      if(res.token){
        localStorage.setItem('userToken',res.token);
        this._AuthenaticationsServices.saveLoggedInUser();
      }
      this._Router.navigate(['/home'])
    },(err) => {
      JSON.stringify(err.error.errors);
      err.error.errors.map((error:any) => {
        if(error.path == 'email')
          this.emailErrors =error.msg;
        if(error.path == 'password')
          this.passwordErrors = error.msg;
        if (error.path == 'phoneNumber')
          this.phoneNumberErrors = error.msg;            
      })
      console.log(this.emailErrors);
      console.log(this.passwordErrors);
      console.log(this.phoneNumberErrors);       
    })
  }
};
