import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartServiceService {
  cartItemCount: number = this.getCartItemCount();
  cartItemCount$ = new BehaviorSubject<number>(this.getCartItemCount());
  constructor() {}
  private getCartItemCount(): number {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart).products.length : 0;
  }

  updateCartItemCount() {
    this.cartItemCount = this.getCartItemCount();
    this.cartItemCount$.next(this.cartItemCount);
  }
}
