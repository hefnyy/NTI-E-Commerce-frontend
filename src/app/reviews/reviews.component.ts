import { Component, OnDestroy, OnInit } from '@angular/core';
import { Pagination } from '../interfaces/pagination';
import { AuthenaticationsService } from '../services/authenatications.service';
import { GlobalServicesService } from '../services/global-services.service';
import { ReviewsService } from '../services/reviews.service';
import { ProductsService } from '../services/products.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

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
  comment: string = '';
  rating:number=1;

  constructor(private _AuthService: AuthenaticationsService, private _ReviewsService: ReviewsService, 
    private _GlobalService: GlobalServicesService,private _ProductsServices: ProductsService) { }

  getComment(comment: string) {
    this.comment = comment;
  }
  getRating(rating: number) {
    this.rating = rating;
  }
  onRatingChange(event: any, review: any) {
    const newRating = event.target.value;
    if (newRating >= 1 && newRating <= 5) {
      review.rating = Number(newRating);
      this.rating = review.rating; // Convert string to number
    } else {
      event.target.value = review.rating; // Reset to original value if out of range
    }
  }

  updateReview(reviewId:string) {
    // const formData = new FormData();
    // formData.append('comment', this.comment);
    console.log(this.comment);
    console.log(this.rating);
    this._ReviewsService.updateUserReview(reviewId,this.comment,this.rating).subscribe({
      next: (res) => {
        this.loadReviews();
        alert('Review has been updated Successfully')
      }
    })
  }

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
