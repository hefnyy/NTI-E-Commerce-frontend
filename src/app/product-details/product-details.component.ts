import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { CurrencyPipe } from '@angular/common';
import { AuthenaticationsService } from '../services/authenatications.service';
import { WishlistService } from '../services/wishlist.service';
import { CartsService } from '../services/carts.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit,OnDestroy {

  id:string='';
  coverDomain:string='';
  imagesDomain:string[]=[];
  product:any={};
  subscription:any;
  mainImage:string='';

  constructor(private _ActivatedRoute:ActivatedRoute,private _ProductsService:ProductsService,private _CartsService:CartsService,
    private _AuthenaticationService:AuthenaticationsService,private _WhishlistService:WishlistService){}


  updateMainImage(imageUrl: string): void {
    this.mainImage = this.coverDomain + imageUrl;
  }

  addProductToWishlist(productId:string): void{
    this._WhishlistService.addProductToWishlist(productId).subscribe((res) => {
      console.log(res.data);
    });
  }
  addProductToCart(productId: string): void {
    this._CartsService.addProductToCart(productId).subscribe((res) => {
      console.log(res.data);
    });}

  ngOnInit(): void {
    // this._AuthenaticationService.checkToken();
    this.id = this._ActivatedRoute.snapshot.params['id'];
    console.log(this.id);
    this.coverDomain=this._ProductsService.coverDomain;
    
    this.subscription = this._ProductsService.getOneProduct(this.id).subscribe((res) => {
      this.product=res.data;
      console.log(this.product);
      
    });
 
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    
  }
}
