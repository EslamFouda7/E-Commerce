import { Component, OnInit } from '@angular/core';
import { cart } from '../../models/product';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { RouterLink, RouterModule } from '@angular/router';
import { SweetalertService } from '../../core/services/sweetalert.service';
import { CartServiceService } from '../../core/services/cart-service.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  constructor(
    private _alert: SweetalertService,
    private _cartService: CartServiceService
  ) {}
  cart: cart | null = null;
  isEmpty: boolean = true;
  ngOnInit(): void {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      this.cart = JSON.parse(cartData);
      this.isEmpty = this.cart?.products?.length === 0;
    }
  }
  getDiscountedPrice(price: number, discount: number): number {
    return price - (price * discount) / 100;
  }

  async removeProduct(index: number): Promise<void> {
    const confirmed = await this._alert.confirm();
    if (confirmed) {
      if (this.cart && this.cart.products) {
        // حذف المنتج من المصفوفة
        this.cart.products.splice(index, 1);

        // إعادة حساب الإجماليات
        this.calculateTotals();

        // تحديث localStorage
        localStorage.setItem('cart', JSON.stringify(this.cart));

        // التحقق إذا أصبحت العربة فارغة
        this.isEmpty = this.cart.products.length === 0;
        this._cartService.updateCartItemCount();
        this._alert.showAlert('Product removed successfully', 'success');
      }
    }
  }

  private calculateTotals(): void {
    if (this.cart) {
      this.cart.totalQuantity = this.cart.products.reduce(
        (sum, product) => sum + (product.quantity || 1),
        0
      );
      this.cart.discountedTotal = this.cart.products.reduce(
        (sum, product) =>
          sum +
          this.getDiscountedPrice(product.price, product.discountPercentage) *
            (product.quantity || 1),
        0
      );
    }
  }
}
