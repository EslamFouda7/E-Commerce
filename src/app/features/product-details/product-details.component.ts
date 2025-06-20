import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
} from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { BtnComponent } from '../../shared/btn/btn.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule,BtnComponent,FormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private _ProductService: ProductService,
    private route: ActivatedRoute
  ) {}
  product: Product | null = null;
  fullStars = 0;
  hasHalfStar = 0;
  starsArray = Array(5).fill(0);

  quantity: number = 1;

  ngOnInit(): void {
    this.GetProductById();
  }
  GetProductById() {
    const ProductId = Number(this.route.snapshot.paramMap.get('id'));
    this._ProductService.GetProductById(ProductId).subscribe({
      next: (res: any) => {
        this.product = res;
        console.log(res);
        const rating = res.rating;
        this.fullStars = Math.floor(rating);
        this.hasHalfStar = rating % 1 >= 0.5 ? 1 : 0;
      },
    });
  }



  getDiscountedPrice(price: number, discount: number): number {
    return price - (price * discount) / 100;
  }
  getQuantityOptions(): number[] {
    const limit = this.product?.minimumOrderQuantity || 1;
    return Array.from({ length: limit }, (_, i) => i + 1);
  }
}
