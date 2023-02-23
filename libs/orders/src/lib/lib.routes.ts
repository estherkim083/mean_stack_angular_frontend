import { Routes } from '@angular/router';
import { AuthGuard } from '@bluebits/users';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';

export const ordersRoutes: Routes = [
  {
    path: 'cart',
    component: CartPageComponent,
  },
  {
    path: 'checkout',
    component: CheckoutPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'success',
    component: ThankYouComponent,
  },
];
