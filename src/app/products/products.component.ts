import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { CurrencyPipe } from '@angular/common';
import { DescriptionPipe } from '../pipes/description.pipe';
import { Pagination } from '../interfaces/pagination';
import { RouterLink } from '@angular/router';
import { CartsService } from '../services/carts.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CurrencyPipe, DescriptionPipe, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {
  cover: string = "logo/cover.png";
  products: any[] = [];
  coverDomain: string = '';
  search: string = '';
  subscription: any;
  page: number = 1;
  pagination: Pagination = {};
  // currentPage:number=1;
  // totalNumberOfPages:number=5;


  constructor(private _ProductsServices: ProductsService, private _CartsService: CartsService) { }

  changeNumberOfPage(page: number): void {
    this.page = page;
    this.loadProducts();
  }

  loadProducts(): void {
    this.subscription = this._ProductsServices.getAllProducts(8, this.page, '-createdAt', this.search).subscribe((res) => {
      // console.log(res.data);
      this.products = res.data;
      this.pagination = res.pagination;
    });
  }
  addProductToCart(productId: string): void {
    this._CartsService.addProductToCart(productId).subscribe((res) => {
      console.log(res.data);
    });
    alert(`This product has been added to your cart`);
  }
  ngOnInit(): void {
    this.coverDomain = this._ProductsServices.coverDomain;
    this.loadProducts();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
