import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem, CartService } from '@bluebits/orders';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'bluebits-product-page',
  templateUrl: './product-page.component.html',
  styles: [],
})
export class ProductPageComponent implements OnInit, OnDestroy {
  product: Product;
  endSubs$: Subject<any> = new Subject();
  quantity = 1;

  constructor(
    private productService: ProductsService,
    private router: ActivatedRoute,
    private cartService: CartService
  ) {}
  ngOnDestroy(): void {
    this.endSubs$.complete();
  }
  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      if (params['productid']) {
        this._getProduct(params['productid']);
      }
    });
  }
  private _getProduct(productid: string) {
    this.productService
      .getProductById(productid)
      .pipe(takeUntil(this.endSubs$))
      .subscribe((product) => {
        this.product = product;
      });
  }
  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: this.quantity,
    };
    this.cartService.setCartItem(cartItem);
  }
}
