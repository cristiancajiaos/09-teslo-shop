import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { ProductResponse } from '@products/interfaces/product.interface';
import { Observable, tap } from 'rxjs';

@Service()
export class ProductService {

  private http = inject(HttpClient);

  private baseUrl = 'http://localhost:3000/api'

  getProducts(): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.baseUrl}/products`).pipe(
      tap((resp) => console.log(resp))
    )
  }
}
