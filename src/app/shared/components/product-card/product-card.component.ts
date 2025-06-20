import {
  Component,

  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../models/product';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    CommonModule,
    NgxPaginationModule,
    RouterLink,
    RouterModule,
    FormsModule
],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent implements OnInit, OnChanges {
  constructor(private _ProductService: ProductService) {}
  @Input() searchValue: string = '';
  @Input() category: string = '';
  product: Product[] = [];
  discountPrice: number = 0;

  // خصائص الباجيناشن
  page: number = 1;
  pageSize: number = 18;
  totalProducts: number = 0;

  ngOnInit(): void {
    this.GetAllProducts();
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.category);
    this.SearchProd();
    if (changes['category']) {
      this.getProductsByCategory();
    }
  }

  GetAllProducts() {
    this._ProductService
      .GetAllProduct(this.page, this.totalProducts)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.product = res.products;
          this.totalProducts = res.total;
        },
      });
  }
  getDiscountedPrice(price: number, discount: number): number {
    return price - (price * discount) / 100;
  }

  SearchProd() {
    if (this.searchValue && this.searchValue.trim() !== '') {
      this._ProductService.SearchProducts(this.searchValue).subscribe({
        next: (res: any) => {
          this.product = res.products;
          console.log(this.product);
        },
      });
    }
  }

  getProductsByCategory() {
    if (this.category === 'all') {
      this.GetAllProducts();
    } else {
      this._ProductService.GetProductsByCategory(this.category).subscribe({
        next: (res: any) => {
          this.product = res.products;
          console.log(this.product);
        },
      });
    }
  }


  search(){

  }
}
