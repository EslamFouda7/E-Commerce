import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  constructor() {
    console.log(this.activeCategory);
  }
  activeCategory: string = '';
  @Output() categorySelected = new EventEmitter<string>();
  setActive(category: string) {
    this.activeCategory = category;
    this.categorySelected.emit(category);
  }
  isSidebarVisible = false;
  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    console.log(this.isSidebarVisible); 
  }
}
