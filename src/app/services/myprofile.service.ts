import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalServicesService } from './global-services.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyprofileService {
  HostName: string = '';
  RouteName: string = '';

  constructor(private _HttpClient: HttpClient, private _Router: Router, private _GlobalServices: GlobalServicesService) {
    this.HostName = this._GlobalServices.hostName;
    this.RouteName = this._GlobalServices.UsersRouteName;
  }

  changeUserPassword(formData: any):Observable<any>{
    return this._HttpClient.put(`${this.HostName}${this.RouteName}/changemypassword`, formData, { headers: { authorization: `Bearer ${localStorage.getItem('userToken')}` } })
  }

}