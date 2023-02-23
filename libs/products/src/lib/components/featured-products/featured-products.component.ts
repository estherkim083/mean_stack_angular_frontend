/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'bluebits-featured-products',
  templateUrl: './featured-products.component.html',
  styles: [],
})
export class FeaturedProductsComponent implements OnInit, OnDestroy {
  constructor(private productsService: ProductsService) {}
  products: Product[] = [];
  endSubs$: Subject<any> = new Subject();

  ngOnInit(): void {
    this._getFeaturedProducts();
  }
  private _getFeaturedProducts() {
    this.productsService
      .getFeaturedProducts(4)
      .pipe(takeUntil(this.endSubs$))
      .subscribe((products) => {
        this.products = products;
      });
  }
  ngOnDestroy(): void {
    this.endSubs$.complete();
  }
}
