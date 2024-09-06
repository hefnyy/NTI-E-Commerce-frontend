import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SignUp,Login } from '../interfaces/authenatications';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthenaticationsService {
  HostName: string = 'http://localhost:3000';
  RouteName: string = '/api/v1/authentication';
  loggedInUser=new BehaviorSubject(null);
  
  constructor(private _HttpClient: HttpClient, _Router: Router) { }
  
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
}
