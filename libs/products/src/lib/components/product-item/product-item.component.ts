import { Component, Input, OnInit } from '@angular/core';
import { CartItem, CartService } from '@bluebits/orders';
import { Product } from '../../models/product';

@Component({
  selector: 'bluebits-product-item',
  templateUrl: './product-item.component.html',
  styles: [],
})
export class ProductItemComponent {
  @Input() product: Product;

  constructor(private cartService: CartService) {}

  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: 1,
    };
    this.cartService.setCartItem(cartItem);
  }
}
