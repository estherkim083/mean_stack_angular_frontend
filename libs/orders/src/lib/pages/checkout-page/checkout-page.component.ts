import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  Cart,
  CartService,
  Order,
  OrderItem,
  OrdersService,
  ORDER_STATUS,
} from '@bluebits/orders';
import { Product, ProductsService } from '@bluebits/products';
import { UsersService } from '@bluebits/users';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'orders-checkout-page',
  templateUrl: './checkout-page.component.html',
  styles: [],
})
export class CheckoutPageComponent implements OnInit, OnDestroy {
  user$;
  constructor(
    private router: Router,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private ordersService: OrdersService,
    private productService: ProductsService
  ) {}

  checkoutFormGroup: FormGroup;
  isSubmitted = false;
  orderItems: OrderItem[] = [];
  userId: string;
  countries = [];
  unsubscribe$: Subject<any> = new Subject();

  ngOnInit(): void {
    this._initCheckoutForm();
    this._getCartItems();
    this._getCountries();
    this._autoFillUserData();
  }

  ngOnDestroy() {
    this.unsubscribe$.complete();
  }
  private async _autoFillUserData() {
    this.usersService
      .observeCurrentUser()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((user) => {
        if (user) {
          this.userId = user._id;
          this.checkoutForm.name.setValue(user.name);
          this.checkoutForm.email.setValue(user.email);
          this.checkoutForm.phone.setValue(user.phone);
          this.checkoutForm.city.setValue(user.city);
          this.checkoutForm.street.setValue(user.street);
          this.checkoutForm.country.setValue(user.country);
          this.checkoutForm.zip.setValue(user.zip);
          this.checkoutForm.apartment.setValue(user.apartment);
        }
      });
  }

  private _initCheckoutForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', Validators.required],
      apartment: ['', Validators.required],
      street: ['', Validators.required],
    });
  }

  private _getCountries() {
    this.countries = this.usersService.getCountries();
  }

  backToCart() {
    this.router.navigate(['/cart']);
  }

  placeOrder() {
    this.isSubmitted = true;
    if (this.checkoutFormGroup.invalid) {
      return;
    }
    const order: Order = {
      orderItems: this.orderItems,
      shippingAddress1: this.checkoutForm.street.value,
      shippingAddress2: this.checkoutForm.apartment.value,
      city: this.checkoutForm.city.value,
      zip: this.checkoutForm.zip.value,
      country: this.checkoutForm.country.value,
      phone: this.checkoutForm.phone.value,
      status: 0,
      user: this.userId,
      dateOrdered: `${Date.now()}`,
    };
    this.ordersService.createOrder(order).subscribe(
      () => {
        //redirect to thank you page
        this.router.navigate(['/success']);
        this.cartService.emptyCart();
      },
      () => {
        // display some message to the user
      }
    );
  }
  private _getCartItems() {
    const cart: Cart = this.cartService.getCart();
    const cartItems = [];
    cart.items.map((item) => {
      cartItems.push([item.productId, item.quantity]);
    });
    for (const item of cartItems) {
      this.productService.getProductById(item[0]).subscribe((resProduct) => {
        this.orderItems.push({
          productId: item[0],
          product: resProduct,
          quantity: item[1],
        });
      });
    }
    console.log(this.orderItems);
  }

  get checkoutForm() {
    return this.checkoutFormGroup.controls;
  }
}
