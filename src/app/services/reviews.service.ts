import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalServicesService } from './global-services.service';
import { Products } from './../interfaces/products';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  
  HostName: string = '';
  RouteName: string = '';
  ProductsRouteName: string = '';

  constructor(private _HttpClient: HttpClient, private _Router: Router, private _GlobalServices: GlobalServicesService) { 
    this.HostName = this._GlobalServices.hostName;
    this.RouteName = this._GlobalServices.ReviewsRouteName;
    this.ProductsRouteName = this._GlobalServices.ProductsRouteName;
  }

  addReview(ProductId:string,formData: any): Observable<any> {
    return this._HttpClient.post(`${this.HostName}${this.ProductsRouteName}/${ProductId}/reviews`, formData, { headers: { authorization: `Bearer ${localStorage.getItem('userToken')}` } })
  }

  getUserReviews(limit: number = 50, page: number = 1, sort: '-createdAt', search: string): Observable<any> {
    return this._HttpClient.get(`${this.HostName}${this.RouteName}/myreviews?limit=${limit}&page=${page}&sort=${sort}&search=${search}`,
      { headers: { authorization: `Bearer ${localStorage.getItem('userToken')}` } })
  }

  updateUserReview(reviewId: string, comment: string,rating:number): Observable<any> {
    return this._HttpClient.put(`${this.HostName}${this.RouteName}/${reviewId}`, {comment:comment,rating:rating}, { headers: { authorization: `Bearer ${localStorage.getItem('userToken')}` } })
  }

  deleteUserReview(reviewId: string): Observable<any> {
    return this._HttpClient.delete(`${this.HostName}${this.RouteName}/${reviewId}`, { headers: { authorization: `Bearer ${localStorage.getItem('userToken')}` } })
  }

  getReview(reviewId: string,formData:any): Observable<any> {
    return this._HttpClient.put(`${this.HostName}${this.RouteName}/${reviewId}`,formData, { headers: { authorization: `Bearer ${localStorage.getItem('userToken')}` } })
  }

  
}
