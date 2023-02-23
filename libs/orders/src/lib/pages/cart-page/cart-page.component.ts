/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CartItemDetailed } from '../../models/cart';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html',
  styles: [],
})
export class CartPageComponent implements OnInit, OnDestroy {
  cartItemsDetailed: CartItemDetailed[] = [];
  cartCount = 0;
  endSubs$: Subject<any> = new Subject();

  constructor(
    private router: Router,
    private cartService: CartService,
    private ordersService: OrdersService
  ) {}
  ngOnDestroy(): void {
    this.endSubs$.complete();
  }

  ngOnInit(): void {
    this._getCartDetails();
  }
  private _getUpdatedCartDetails() {
    let cartItemsDetailedTmp;
    this.cartService.cart$
      .pipe(takeUntil(this.endSubs$))
      .subscribe((resCart) => {
        cartItemsDetailedTmp = [];
        this.cartCount = resCart?.items?.length ?? 0;
        resCart.items.forEach((cartItem) => {
          this.ordersService
            .getProduct(cartItem.productId)
            .subscribe((resProduct) => {
              cartItemsDetailedTmp.push({
                product: resProduct,
                quantity: cartItem.quantity,
              });
            });
        });
      });
    this.cartItemsDetailed = cartItemsDetailedTmp;
  }
  private _getCartDetails() {
    const resCart = this.cartService.getCart();
    this.cartItemsDetailed = [];
    this.cartCount = resCart?.items?.length ?? 0;
    resCart.items.forEach((cartItem) => {
      this.ordersService
        .getProduct(cartItem.productId)
        .subscribe((resProduct) => {
          this.cartItemsDetailed.push({
            product: resProduct,
            quantity: cartItem.quantity,
          });
        });
    });
  }
  backToShop() {
    this.router.navigate(['/products']);
  }
  deleteCartItem(cartItem: CartItemDetailed) {
    this.cartService.deleteCartItem(cartItem.product.id);
    this._getUpdatedCartDetails();
  }
  updateCartItemQuantity(event, cartItem: CartItemDetailed) {
    this.cartService.setCartItem(
      {
        productId: cartItem.product.id,
        quantity: event.value,
      },
      true
    );
  }
}
