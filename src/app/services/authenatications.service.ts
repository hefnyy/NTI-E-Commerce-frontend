import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SignUp,Login } from '../interfaces/authenatications';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';
import { GlobalServicesService } from './global-services.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenaticationsService  {
  HostName: string = '' ;
  RouteName: string = '';
  loggedInUser=new BehaviorSubject(null);
  
  constructor(private _HttpClient: HttpClient,private _Router: Router, private _GlobalServices: GlobalServicesService) { 
    this.HostName = this._GlobalServices.hostName;
    this.RouteName = this._GlobalServices.AuthenaticationRouteName;
    
    if (localStorage.getItem('userToken') !== null) 
      this.saveLoggedInUser()

   }
  
  
  saveLoggedInUser(){
    const token:any=localStorage.getItem('userToken');
    this.loggedInUser.next(jwtDecode(token));
    // console.log(this.loggedInUser);
  }

  signUp(formData: SignUp): Observable<any> {
    return this._HttpClient.post(`${this.HostName}${this.RouteName}/signup`, formData)
  }
  login(formData: Login): Observable<any> {
    return this._HttpClient.post(`${this.HostName}${this.RouteName}/login`, formData)
  }
  logout(){
    localStorage.removeItem('userToken');
    this.loggedInUser.next(null);    
  };

  sendEmail(formData: Login): Observable<any> {

    return this._HttpClient.post(`${this.HostName}${this.RouteName}/forgetmypassword`, formData);

  };

  verifyCode(formData: Login): Observable<any> {
    return this._HttpClient.post(`${this.HostName}${this.RouteName}/verifyresetcode`, formData, { headers: { authorization: `Bearer ${localStorage.getItem('verify')}` } });
  };

  changePassword(formData: Login): Observable<any> {
    return this._HttpClient.put(`${this.HostName}${this.RouteName}/resetcodepasswordchange`, formData, { headers: { authorization: `Bearer ${localStorage.getItem('verify')}` } });
  };

  checkToken() {
    const token: any = localStorage.getItem('userToken');
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp! < Date.now() / 1000) {
      this.logout()
      this._Router.navigate(['/home'])
    }
  }

}
