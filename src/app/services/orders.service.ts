import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalServicesService } from './global-services.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  HostName:string='';
  RouteName:string='';

  constructor(private _HttpClient: HttpClient, private _Router: Router, private _GlobalServices: GlobalServicesService) { 
    this.HostName=this._GlobalServices.hostName;
    this.RouteName=this._GlobalServices.OrdersRouteName;
    }
  
    createOrder(formData:any): Observable<any> {
      return this._HttpClient.post(`${this.HostName}${this.RouteName}`, formData , { headers: { authorization: `Bearer ${localStorage.getItem('userToken')}` } })
     }

  getLoggedInUserOrders(limit: number = 50, page: number = 1, sort: '-createdAt', search: string): Observable<any>{
    return this._HttpClient.get(`${this.HostName}${this.RouteName}?limit=${limit}&page=${page}&sort=${sort}&search=${search}`,{ headers: { authorization: `Bearer ${localStorage.getItem('userToken')}` } })
     }
}
