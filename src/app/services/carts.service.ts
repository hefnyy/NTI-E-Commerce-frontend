import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalServicesService } from './global-services.service';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  HostName: string = '';
  RouteName: string = '';

  constructor(private _HttpClient: HttpClient, private _Router: Router, private _GlobalServices: GlobalServicesService) { 
    this.HostName = this._GlobalServices.hostName;
    this.RouteName = this._GlobalServices.CartsRouteName;
  }

  addProductToCart(product: string): Observable<any> {
    return this._HttpClient.post(`${this.HostName}${this.RouteName}`, { product }, { headers: { authorization: `Bearer ${localStorage.getItem('userToken')}` } })
  }

}
