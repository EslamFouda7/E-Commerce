import { Routes } from '@angular/router';
import { ProductDetailsComponent } from './features/product-details/product-details.component';
import { HomeComponent } from './features/home/home.component';
import { CartComponent } from './features/cart/cart.component';

export const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:"ProductDetails/:id",component:ProductDetailsComponent},
  {path:"cart",component:CartComponent}
];
