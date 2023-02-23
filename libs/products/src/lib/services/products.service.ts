/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}
  getProducts(categoryFilter?: string[]): Observable<Product[]> {
    let params = new HttpParams();
    if (categoryFilter) {
      params = params.append('categories', categoryFilter.join(','));
      console.log(params);
    }
    return this.http.get<Product[]>(environment.apiUrl + 'products', {
      params: params,
    });
  }
  getProductsCount(): Observable<number> {
    return this.http
      .get<number>(`${environment.apiUrl + 'products'}/get/count`)
      .pipe(map((objectValue: any) => objectValue.productCount));
  }
  createProduct(productData: FormData): Observable<Product> {
    return this.http.post<Product>(
      environment.apiUrl + 'products',
      productData
    );
  }
  updateProduct(productData: FormData, id: string): Observable<Product> {
    return this.http.put<Product>(
      environment.apiUrl + 'products/' + id,
      productData
    );
  }
  // eslint-disable-next-line @typescript-eslint/ban-types
  deleteProduct(productId: string): Observable<Object> {
    return this.http.delete(environment.apiUrl + 'products/' + productId);
  }
  // eslint-disable-next-line @typescript-eslint/ban-types
  getProductById(productId: string): Observable<Product> {
    return this.http.get<Product>(environment.apiUrl + 'products/' + productId);
  }

  getFeaturedProducts(count: number): Observable<Product[]> {
    return this.http.get<Product[]>(
      environment.apiUrl + 'products/get/featured/' + count
    );
  }
}
