import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { authenaticationGuard } from './guards/authenatication.guard';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ForgetmypasswordComponent } from './forgetmypassword/forgetmypassword.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { CartComponent } from './cart/cart.component';
import { OrdersComponent } from './orders/orders.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { UpdatereviewComponent } from './updatereview/updatereview.component';

export const routes: Routes = [
  { path: '', title: 'NTI-E-Commerce', redirectTo:'home',pathMatch:'full'},
  { path: 'home', title: 'NTI-E-Commerce', component:HomeComponent},
  { path: 'products', title: 'NTI-E-Commerce', component: ProductsComponent},
  { path: 'products/:id', title: 'NTI-E-Commerce', component: ProductDetailsComponent },
  { path: 'signup', title: 'NTI-E-Commerce', component: SignupComponent },
  { path: 'login', title: 'NTI-E-Commerce', component:LoginComponent},
  { path: 'wishlist', title: 'NTI-E-Commerce', canActivate: [authenaticationGuard], component: WishlistComponent },
  { path: 'myreviews', title: 'NTI-E-Commerce', canActivate: [authenaticationGuard], component: ReviewsComponent },
  { path: 'myreviews/:id', title: 'NTI-E-Commerce', canActivate: [authenaticationGuard], component: UpdatereviewComponent },
  { path: 'cart', title: 'NTI-E-Commerce', canActivate: [authenaticationGuard], component: CartComponent },
  { path: 'myorders', title: 'NTI-E-Commerce', canActivate: [authenaticationGuard], component: OrdersComponent },
  { path: 'myprofile', title: 'NTI-E-Commerce', canActivate: [authenaticationGuard], component: MyprofileComponent },
  { path: 'forgetmypassword', title: 'NTI-E-Commerce', component: ForgetmypasswordComponent },
  { path: '**', title: 'NTI-E-Commerce', component:NotFoundComponent}


];
