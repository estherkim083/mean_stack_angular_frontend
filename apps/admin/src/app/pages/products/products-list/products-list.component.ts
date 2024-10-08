import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '@bluebits/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [],
})
export class ProductsListComponent implements OnInit {
  products = [];
  constructor(
    private productsService: ProductsService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}
  ngOnInit(): void {
    this._getProducts();
  }
  private _getProducts() {
    this.productsService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }
  updateProduct(productId: string) {
    this.router.navigateByUrl(`products/form/${productId}`);
  }
  deleteProduct(productId: string): void {
    this.confirmationService.confirm({
      message: 'Do you want to delete this product?',
      header: 'Delete Product',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productsService.deleteProduct(productId).subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Service Message',
              detail: 'Product is deleted',
            });
            this._getProducts();
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error Message',
              detail: 'Product is not deleted',
            });
          }
        );
      },
    });
  }
}
