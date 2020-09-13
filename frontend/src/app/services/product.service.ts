import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ProductModelServer } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


serverurl = environment.SERVER_URL;
  constructor(private http: HttpClient) { }

  getAllProducts(limitOfResults = 10): any {
    return this.http.get(this.serverurl + '/products', {
      params: {
        limit: limitOfResults.toString()
      }
    });
  }

  getSingleProduct(id: number): Observable<ProductModelServer> {
    return this.http.get<ProductModelServer>(this.serverurl + '/products/' + id);
  }

  getProductsFromCategory(catName: string): Observable<ProductModelServer[]> {
    return this.http.get<ProductModelServer[]>(this.serverurl + '/products/category/' + catName);
  }
}

