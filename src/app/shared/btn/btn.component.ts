import { Component, Input } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { SweetalertService } from '../../core/services/sweetalert.service';
import { CartServiceService } from '../../core/services/cart-service.service';

@Component({
  selector: 'app-btn',
  standalone: true,
  imports: [],
  templateUrl: './btn.component.html',
  styleUrl: './btn.component.css'
})
export class BtnComponent {
  @Input() product!:{id:number, quantity:number}
  constructor(private _ProductService:ProductService
    ,private _alert:SweetalertService,
    private _cartService:CartServiceService
  ){}

 AddToCart() {
  const products = [{ id: this.product.id, quantity: this.product.quantity || 1 }];

  this._ProductService.AddToCart(products, this.product).subscribe({
    next: (res: any) => {
      console.log('تمت الإضافة للكارت', res);

      const oldCartData = localStorage.getItem('cart');
      let mergedCart = res;

      if (oldCartData) {
        const oldCart = JSON.parse(oldCartData);

        // البحث عن المنتج إذا كان موجود بالفعل
        const existingProductIndex = oldCart.products.findIndex(
          (p: any) => p.id === res.products[0].id
        );

        if (existingProductIndex !== -1) {
          // زيادة الكمية فقط لو المنتج موجود
          oldCart.products[existingProductIndex].quantity += res.products[0].quantity;
          mergedCart.products = oldCart.products;
        } else {
          // إضافة المنتج الجديد لو مش موجود
          mergedCart.products = [...oldCart.products, ...res.products];
        }

        // تحديث الإحصائيات الكلية
        mergedCart.totalQuantity = oldCart.totalQuantity + res.totalQuantity;
        mergedCart.total = oldCart.total + res.total;
        mergedCart.discountedTotal = oldCart.discountedTotal + res.discountedTotal;
        mergedCart.totalProducts = oldCart.products.length; // عدد المنتجات الفريدة
      }
      localStorage.setItem('cart', JSON.stringify(mergedCart));
      this._cartService.updateCartItemCount();
      this._alert.showAlert('Added to cart','success')

    },
    error: (err) => {
      this._alert.showAlert('An error occurred while adding','error')
    }
  });
}
}
