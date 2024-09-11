import { Component, OnDestroy, OnInit } from '@angular/core';
import { GlobalServicesService } from '../services/global-services.service';
import { AuthenaticationsService } from '../services/authenatications.service';
import { CartsService } from '../services/carts.service';
import { CurrencyPipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe,ReactiveFormsModule,FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnDestroy,OnInit {

  subscription: any;
  cart: any = {};
  productsLength: number = 0;
  productImage: string = ''
  deliveryFees: number = 100;
  promoCodeError: string = '';
  // address: string='';

  loginForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
  })
  promoCodeForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
  })

  addressForm = new FormGroup({
    address: new FormControl(null, [Validators.required]),
  })
  constructor(private _AuthenaticationService: AuthenaticationsService, private _Router:Router,
    private _GlobalService: GlobalServicesService, private _CartService: CartsService, private _OrdersService:OrdersService) { }

    loadCart(){
      this.subscription = this._CartService.getUserCart().subscribe({
        next: (res) => {
          this.cart = res.data;
          this.productsLength = res.length;
        }, error: (err) => {

        }
      })
    }

    removeProductFromCart(productId:string){
      this._CartService.removeProductFromCart(productId).subscribe({
        next:(params) => {
          this.loadCart();
          alert('Product has been removed from the cart')
          
        }
      , error:(params) => {
        
      }
    })
    }

    applyPromoCode(formData:FormGroup){
      this._CartService.applyPromoCode(formData.value).subscribe({
        next: (res) => { this.loadCart() },
        error: (err) => { this.promoCodeError = err.error.message }
      })
    }

  clearCart() {
    this._CartService.clearCart().subscribe({
      next: (res) => {
        alert('Cart has been Cleared')
        this._Router.navigate(['/home'])
      }, error: (err) => { },
    })
  }

  createOrder(formData:FormGroup){
    // console.log('inside create order');
    this._OrdersService.createOrder(formData.value).subscribe({
      next: (res) => {
        alert('Order has been Created');
        this._Router.navigate(['/myorders']);
      },error: (err) => {
        
      }
    })
  }

    ngOnInit(): void {
      // this._AuthenaticationService.checkToken();
      this.productImage = this._GlobalService.ProductCoverDomain;
      this.loadCart();
    }

    ngOnDestroy(): void {
      this.subscription.unsubscribe();
      // console.log('destroy');
      // console.log(this.address);
    }
  }

