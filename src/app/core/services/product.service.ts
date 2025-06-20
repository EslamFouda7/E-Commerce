import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment.development';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';
import {USER_ID} from '../services/users.service'

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  //get all product
  GetAllProduct(page: number, limit: number): Observable<Product> {
    const skip = (page - 1) * limit;
    return this.http.get<Product>(
      `${environment.baseUrl}?limit=${limit}&skip=${skip}`
    );
  }
  //get Product by Id
  GetProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${environment.baseUrl}/${id}`);
  }
  //search product
  SearchProducts(query: string) {
    return this.http.get(`${environment.baseUrl}/search?q=${query}`);
  }

  //get product by category
  GetProductsByCategory(category: string) {
    return this.http.get(`${environment.baseUrl}/category/${category}`);
  }

 AddToCart(products: { id: number; quantity: number; }[], p0: { id: any; quantity: any; }) {
    return this.http.post(`${environment.cartsUrl}/carts/add`, {
      userId: USER_ID,
      products:products
    });
  }
}
