import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient) { }

  createProduct(product: any): Observable<any> {
    return this.http.post(this.apiUrl, product);
  }

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  updateProduct(id: number, updatedProduct: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, updatedProduct);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
