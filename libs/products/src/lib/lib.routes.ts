import { Route } from '@angular/router';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';

export const productRoutes: Route[] = [
  {
    path: 'products',
    component: ProductsListComponent,
  },
  {
    path: 'products/category/:categoryid',
    component: ProductsListComponent,
  },
  {
    path: 'products/:productid',
    component: ProductPageComponent,
  },
];
