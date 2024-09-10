import { Component, OnDestroy, OnInit } from '@angular/core';
import { Pagination } from '../interfaces/pagination';
import { AuthenaticationsService } from '../services/authenatications.service';
import { GlobalServicesService } from '../services/global-services.service';
import { ReviewsService } from '../services/reviews.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent implements OnDestroy,OnInit {
  subscription: any;
  reviews: any[] = [];
  reviewsLength: number = 0;
  page: number = 1;
  pagination: Pagination = {};
  search: string = ''
  coverDomain: string = '';

  constructor(private _AuthService: AuthenaticationsService, private _ReviewsService: ReviewsService, 
    private _GlobalService: GlobalServicesService,private _ProductsServices: ProductsService) { }

  loadReviews() {
    this.subscription = this._ReviewsService.getUserReviews(undefined, this.page, '-createdAt', this.search).subscribe({
      next: (res) => {
        this.reviews = res.data;
        this.pagination = res.pagination;
        this.reviewsLength = res.length;
      }
    })
  }

  deleteReview(reviewId: string) {
    this._ReviewsService.deleteUserReview(reviewId).subscribe({
      next: (res) => {
        this.loadReviews();
        alert('Review deleted successfully');
      }
    })
  }

  changeNumberOfPage(page: number) {
    this.page = page;
    this.loadReviews();
  }

  ngOnInit(): void {
    // this._AuthService.checkToken();
    this.coverDomain = this._GlobalService.ProductCoverDomain;
    this.loadReviews();
  }

  ngOnDestroy(): void { 
    this.subscription.unsubscribe() };
}
