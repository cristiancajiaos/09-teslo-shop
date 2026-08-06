import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Product, ProductResponse } from '@products/interfaces/product.interface';
import { delay, Observable, of, tap } from 'rxjs';
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

  private productsCache = new Map<string, ProductResponse>();

  private productCache = new Map<string, Product>();

  getProducts(options: Options): Observable<ProductResponse> {

    const {limit = 9, offset = 0, gender = ''} = options;

    const key = `${limit}-${offset}-${gender}`; // 9-0-''
    if (this.productsCache.has(key)) {
      return of(this.productsCache.get(key)!);
    }

    return this.http.get<ProductResponse>(`${baseUrl}/products`, {
      params: {
        limit: limit,
        offset: offset,
        gender: gender
      }
    }).pipe(
      tap((resp) => console.log(resp)),
      tap((resp) => this.productsCache.set(key, resp))
    )
  }

  getProductByIdSlug(idSlug: string): Observable<Product> {
    const key = `${idSlug}`;
    if (this.productCache.has(key)) {
      return of(this.productCache.get(key)!);
    }

    return this.http.get<Product>(`${baseUrl}/products/${idSlug}`).pipe(
      // delay(2000),
      tap((product) => console.log(product)),
      tap((product) => this.productCache.set(key, product))
    );
  }

  getProductById(id: string): Observable<Product> {
    const key = `${id}`;
    if (this.productCache.has(key)) {
      return of(this.productCache.get(key)!);
    }

    return this.http.get<Product>(`${baseUrl}/products/${id}`).pipe(
      // delay(2000),
      tap((product) => console.log(product)),
      tap((product) => this.productCache.set(key, product))
    );
  }
}
