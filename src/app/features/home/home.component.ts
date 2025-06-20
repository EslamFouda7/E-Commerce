import { Component } from '@angular/core';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { AppComponent } from "../../app.component";
import { RouterModule } from '@angular/router';
import { CarouselComponent } from "../carousel/carousel.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarComponent, ProductCardComponent, NavbarComponent, CarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  searchTerm: string = '';

  onSearch(value: string) {
    this.searchTerm = value;
  }

  selectedCategory: string = '';
  onCategorySelected(category: string) {
    this.selectedCategory = category;
  }
}
