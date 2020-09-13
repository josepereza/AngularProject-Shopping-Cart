import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private products: ProductResponseModel[] = [];
  private serverurl = environment.SERVER_URL;

  constructor(private http: HttpClient) { }
  getSingleOrder(orderId: number): any {
    return this.http.get<ProductResponseModel[]>(`${this.serverurl}orders/${orderId}`).toPromise();
  }
}
interface ProductResponseModel {
  id: number;
  title: string;
  description: string;
  price: number;
  quantityOrdered: number;
  image: string;
}
