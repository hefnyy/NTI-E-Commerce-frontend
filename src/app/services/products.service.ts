import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalServicesService } from './global-services.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  HostName: string = '';
  RouteName: string = '';
  coverDomain: string ='';

  constructor(private _HttpClient: HttpClient, private _GlobalServices: GlobalServicesService) {
    this.HostName = this._GlobalServices.hostName;
    this.RouteName = this._GlobalServices.ProductsRouteName;
    this.coverDomain = this._GlobalServices.ProductCoverDomain;
   }

  getAllProducts(limit:number=16,page:number=1,sort:string='-createdAt',search:string):Observable<any>{
    return this._HttpClient.get(`${this.HostName}${this.RouteName}?limit=${limit}&page=${page}&sort=${sort}&search=${search}`);
  }
  getOneProduct(id: string): Observable<any>{
    return this._HttpClient.get(`${this.HostName}${this.RouteName}/${id}`)
  }

}
