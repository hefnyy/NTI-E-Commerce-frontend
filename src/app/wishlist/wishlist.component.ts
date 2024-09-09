import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { WishlistService } from '../services/wishlist.service';
import { CartsService } from '../services/carts.service';
import { GlobalServicesService } from '../services/global-services.service';
import { AuthenaticationsService } from '../services/authenatications.service';
import { DescriptionPipe } from '../pipes/description.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, DescriptionPipe,RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit,OnDestroy {

  subscription: any;
  wishlist: any[] = [];
  wishlistLength: number = 0;
  productImage: string = ''

  constructor(private _AuthenaticationService: AuthenaticationsService, private _wishlistService: WishlistService,
    private _GlobalService: GlobalServicesService, private _CartService: CartsService) { }

  loadWishlist() {
    this.subscription = this._wishlistService.getUserWishlist().subscribe({
      next: (res) => {
        this.wishlist = res.data
        this.wishlistLength = res.length
      }, error: (err) => { }
    })
  }

  removeFromWishlist(itemId: string) {
    this._wishlistService.removeProductFromWishlist(itemId).subscribe({
      next: (res) => {
        this.loadWishlist();
        alert('Product has been removed from Wishlist')
      }, error: (err) => { }
    })
  }

  addToCart(productId: string) {
    this._CartService.addProductToCart(productId).subscribe({
      next: (res) => {
        alert('Product has been Added to Cart')
      }, error: (err) => { }
    })
  }

    ngOnInit(): void {
      this.productImage = this._GlobalService.ProductCoverDomain;
      this.loadWishlist();
    }
    ngOnDestroy(): void {
      this.subscription.unsubscribe() 
    }
}
