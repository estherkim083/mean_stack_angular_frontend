/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@bluebits/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [],
})
export class CategoriesListComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  endsubs$: Subject<any> = new Subject();
  constructor(
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}
  ngOnDestroy(): void {
    this.endsubs$.complete();
    // unsubscribe 이 모든 api 에 적용되어야 한다.
    // 과정 생략
  }
  ngOnInit(): void {
    this._getCategories();
  }
  deleteCategry(categoryId: string): void {
    this.confirmationService.confirm({
      message: 'Do you want to delete this category?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoriesService.deleteCategory(categoryId).subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Service Message',
              detail: 'Category is deleted',
            });
            this._getCategories();
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error Message',
              detail: 'Category is not deleted',
            });
          }
        );
      },
    });
  }
  private _getCategories() {
    this.categoriesService
      .getCategories()
      .pipe(takeUntil(this.endsubs$))
      .subscribe((cats) => {
        this.categories = cats;
      });
  }
  updateCategory(categoryId: string) {
    this.router.navigateByUrl(`categories/form/${categoryId}`);
  }
}
