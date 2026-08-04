import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Product, ProductResponse } from '@products/interfaces/product.interface';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';

const baseUrl = environment.baseUrl;

interface Options {
  limit?: number;
  offset?: number;
  gender?: string;
}
@Service()
export class ProductService {

  private http = inject(HttpClient);

  getProducts(options: Options): Observable<ProductResponse> {

    const {limit = 10, offset = 0, gender = ''} = options;

    return this.http.get<ProductResponse>(`${baseUrl}/products`, {
      params: {
        limit: limit,
        offset: offset,
        gender: gender
      }
    }).pipe(
      tap((resp) => console.log(resp))
    )
  }

  getProductByIdSlug(idSlug: string): Observable<Product> {
    return this.http.get<Product>(`${baseUrl}/products/${idSlug}`)
  }
}
