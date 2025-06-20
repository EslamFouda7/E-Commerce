import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { CartServiceService } from '../../../core/services/cart-service.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  cartItemsCount: number = 0;
  constructor(private _cartService: CartServiceService) {}
  ngOnInit(): void {
    this._cartService.cartItemCount$.subscribe((count) => {
      this.cartItemsCount = count;
    });
  }
}
