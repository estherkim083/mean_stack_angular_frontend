import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(environment.apiUrl + 'categories');
  }
  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(
      environment.apiUrl + 'categories',
      category
    );
  }
  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(
      environment.apiUrl + 'categories/' + category._id,
      category
    );
  }
  // eslint-disable-next-line @typescript-eslint/ban-types
  deleteCategory(categoryId: string): Observable<Object> {
    return this.http.delete(environment.apiUrl + 'categories/' + categoryId);
  }
  // eslint-disable-next-line @typescript-eslint/ban-types
  getCategoryById(categoryId: string): Observable<Category> {
    return this.http.get<Category>(
      environment.apiUrl + 'categories/' + categoryId
    );
  }
}
