import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ordersRoutes } from './lib.routes';
import { CartService } from './services/cart.service';
import { OrdersCartIconComponent } from './components/orders-cart-icon/orders-cart-icon.component';
import { BadgeModule } from 'primeng/badge';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BadgeModule,
    RouterModule.forChild(ordersRoutes),
    ButtonModule,
    InputNumberModule,
    FormsModule,
    DropdownModule,
    ReactiveFormsModule,
    InputMaskModule,
    InputTextModule,
  ],
  declarations: [
    OrdersCartIconComponent,
    CartPageComponent,
    OrderSummaryComponent,
    CheckoutPageComponent,
    ThankYouComponent,
  ],
  exports: [
    OrdersCartIconComponent,
    CartPageComponent,
    OrderSummaryComponent,
    CheckoutPageComponent,
    ThankYouComponent,
  ],
})
export class OrdersModule {
  constructor(private cartService: CartService) {
    cartService.initCartLocalStorage();
  }
}
