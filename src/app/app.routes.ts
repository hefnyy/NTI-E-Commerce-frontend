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

export const routes: Routes = [
  {path:'', redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  { path: 'products', component: ProductsComponent},
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'signup', component: SignupComponent },
  {path:'login',component:LoginComponent},
  { path: 'wishlist', canActivate: [authenaticationGuard], component: WishlistComponent },
  { path: 'myreviews', canActivate: [authenaticationGuard], component: ReviewsComponent },
  { path: 'cart', canActivate: [authenaticationGuard], component: CartComponent },
  { path: 'forgetmypassword', component: ForgetmypasswordComponent },
  {path:'**',component:NotFoundComponent}


];
