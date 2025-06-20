import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    NavbarComponent,
    FooterComponent,
    NgxSpinnerModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  cartItemCount: number = this.getCartItemCount();
  title = 'E-Commerce';
  loading: boolean = true;
  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 2500);
    console.log(this.cartItemCount);
  }


  getCartItemCount() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart).products.length : 0;
  }
  updateCartItemCount() {
    this.cartItemCount = this.getCartItemCount();
  }
}
