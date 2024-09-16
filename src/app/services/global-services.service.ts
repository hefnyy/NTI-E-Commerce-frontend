import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalServicesService {

  hostName: string = 'http://localhost:3000';
  AuthenaticationRouteName: string = '/api/v1/authentication';
  ProductsRouteName: string = '/api/v1/products';
  ProductCoverDomain: string = 'http://localhost:3000/products/';
  CartsRouteName: string = '/api/v1/carts';
  WishlistRouteName: string = '/api/v1/wishlist';
  ReviewsRouteName: string = '/api/v1/reviews';
  OrdersRouteName: string = '/api/v1/orders';
  UsersRouteName: string = '/api/v1/users';
  userProfileImage: string = `${this.hostName}/users/`


  constructor() { }
}
