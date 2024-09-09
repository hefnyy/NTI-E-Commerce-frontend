import { CurrencyPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { DescriptionPipe } from '../pipes/description.pipe';
import { RouterLink } from '@angular/router';
import { CartsService } from '../services/carts.service';

@Component({
  selector: 'app-bestseller',
  standalone: true,
  imports: [CurrencyPipe,DescriptionPipe,RouterLink],
  templateUrl: './bestseller.component.html',
  styleUrl: './bestseller.component.scss'
})
export class BestsellerComponent implements OnInit,OnDestroy {

  cover: string = "logo/cover.png";
  products:any[]=[];
  coverDomain:string='';
  search:string='';
  subscription:any;

  constructor(private _ProductsServices: ProductsService, private _CartsService: CartsService){}

  addProductToCart(productId: string): void {
    this._CartsService.addProductToCart(productId).subscribe((res) => {
      console.log(res.data);
    });
    alert('This product has been added to your cart');
  }

  ngOnInit(): void {
    this.coverDomain = this._ProductsServices.coverDomain;
    this.subscription = this._ProductsServices.getAllProducts(16,1,'-sold',this.search).subscribe((res) => {
      // console.log(res.data);
      this.products=res.data;     
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    
  }
}
