import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Pagination } from '../interfaces/pagination';
import { AuthenaticationsService } from '../services/authenatications.service';
import { OrdersService } from '../services/orders.service';
import { ProductsService } from '../services/products.service';
import { GlobalServicesService } from '../services/global-services.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit,OnDestroy{
  subscription: any;
  orders:any=[];
  ordersLength: number = 0;
  page: number = 1;
  pagination: Pagination = {};
  search: string = ''
  productCover: string = '';

  constructor(private _AuthService: AuthenaticationsService, private _OrdersService: OrdersService,
    private _GlobalService: GlobalServicesService, private _ProductsServices: ProductsService){}

    loadOrders(){
      this.subscription = this._OrdersService.getLoggedInUserOrders(undefined, this.page, '-createdAt', this.search).subscribe({
        next: (res) => {
          this.orders = res.data;
          this.ordersLength = res.length;
          this.pagination = res.pagination;
        },error: (err) => {
          
        }
      })
    }
    changeNumberOfPage(page: number){
      this.page = page;
      this.loadOrders();
    }

  ngOnInit(): void {
    // this._AuthService.checkToken();
    this.productCover = this._GlobalService.ProductCoverDomain;
    this.loadOrders();
  }
  
    ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }


}
