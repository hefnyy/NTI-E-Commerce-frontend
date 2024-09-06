import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  HostName: string = 'http://localhost:3000';
  RouteName: string = '/api/v1/carts';

  constructor(private _HttpClient: HttpClient, private _Router: Router) { }

  addProductToCart(product: string): Observable<any> {
    return this._HttpClient.post(`${this.HostName}${this.RouteName}`, { product }, { headers: { authorization: `Bearer ${localStorage.getItem('userToken')}` } })
  }

}
