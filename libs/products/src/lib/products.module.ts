import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { RouterModule } from '@angular/router';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ButtonModule } from 'primeng/button';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { productRoutes } from './lib.routes';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { RatingModule } from 'primeng/rating';
import { InputNumberModule } from 'primeng/inputnumber';
import { UiModule } from '@bluebits/ui';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(productRoutes),
    ButtonModule,
    CheckboxModule,
    FormsModule,
    RatingModule,
    InputNumberModule,
    UiModule,
  ],
  declarations: [
    ProductsSearchComponent,
    CategoriesBannerComponent,
    FeaturedProductsComponent,
    ProductItemComponent,
    ProductsListComponent,
    ProductPageComponent,
  ],
  exports: [
    ProductsSearchComponent,
    FeaturedProductsComponent,
    CategoriesBannerComponent,
    ProductItemComponent,
    ProductsListComponent,
    ProductPageComponent,
  ],
})
export class ProductsModule {}
