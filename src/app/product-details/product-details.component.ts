import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { AuthenaticationsService } from '../services/authenatications.service';
import { WishlistService } from '../services/wishlist.service';
import { CartsService } from '../services/carts.service';
import { ReviewsService } from '../services/reviews.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CurrencyPipe,DatePipe,ReactiveFormsModule,ReactiveFormsModule],
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
  reviewError: string = '';

  reviewForm = new FormGroup({
    comment: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
    rating: new FormControl(null, [Validators.required, Validators.max(5),Validators.min(1)]),
  })

  constructor(private _ActivatedRoute:ActivatedRoute,private _ProductsService:ProductsService,private _CartsService:CartsService,
    private _AuthenaticationService:AuthenaticationsService,private _WhishlistService:WishlistService,private _reviewsServices:ReviewsService){}

    loadProduct(){
      this.subscription = this._ProductsService.getOneProduct(this.id).subscribe((res) => {
        this.product = res.data;
        // console.log(this.product);
      });
    }

  updateMainImage(imageUrl: string): void {
    this.mainImage = this.coverDomain + imageUrl;
  }

  addProductToWishlist(productId:string): void{
    this._WhishlistService.addProductToWishlist(productId).subscribe((res) => {
      console.log(res.data);
      alert(`This product {${this.product.name}} has been added to your wishlist`);
    });
    
  }
  addProductToCart(productId: string): void {
    this._CartsService.addProductToCart(productId).subscribe((res) => {
      console.log(res.data);
      alert(`This product {${this.product.name}} has been added to your cart`);
    });
    
}

  addReview(productId:string,formData:FormGroup){
    console.log(formData);
    this._reviewsServices.addReview(productId,formData.value).subscribe({
      next:(res)=>{
        this.loadProduct();
        alert('The review has been added')},
      error: (err) => {
        if (err.error.errors) {
          err.error.errors.map((error: any) => {
            if (error.path === 'product') 
               this.reviewError = error.msg; 
          })
        }
        else 
          this.reviewError = `login first to add review`;
        
    }});
  }

  ngOnInit(): void {
    // this._AuthenaticationService.checkToken();
    this.id = this._ActivatedRoute.snapshot.params['id'];
    // console.log(this.id);
    this.coverDomain=this._ProductsService.coverDomain;
    this.loadProduct();
    
 
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    
  }
}
