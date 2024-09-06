import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  HostName: string = 'http://localhost:3000';
  RouteName: string = '/api/v1/products';
  coverDomain: string ='http://localhost:3000/products/';

  constructor(private _HttpClient:HttpClient) { }

  getAllProducts(limit:number=16,page:number=1,sort:string='-createdAt',search:string):Observable<any>{
    return this._HttpClient.get(`${this.HostName}${this.RouteName}?limit=${limit}&page=${page}&sort=${sort}&search=${search}`);
  }
  getOneProduct(id: string): Observable<any>{
    return this._HttpClient.get(`${this.HostName}${this.RouteName}/${id}`)
  }

}
