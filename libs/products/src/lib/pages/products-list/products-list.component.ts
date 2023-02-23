import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../models/category';
import { Product } from '../../models/product';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'bluebits-products-list',
  templateUrl: './products-list.component.html',
  styles: [],
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  isCategoryPage: boolean;
  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      params['categoryid']
        ? this._getProducts([params['categoryid']])
        : this._getProducts();
      params['categoryid']
        ? (this.isCategoryPage = true)
        : (this.isCategoryPage = false);
    });
    this._getCategories();
  }
  private _getProducts(categoryFilter?: string[]) {
    this.productsService
      .getProducts(categoryFilter)
      .subscribe((resProducts) => {
        this.products = resProducts;
      });
  }
  private _getCategories() {
    this.categoriesService.getCategories().subscribe((resCategories) => {
      this.categories = resCategories;
    });
  }
  categoryFilter() {
    const selectedCategories: string[] = this.categories
      .filter((category) => category.checked)
      .map((category) => category._id);
    console.log(selectedCategories);
    if (selectedCategories) {
      this._getProducts(selectedCategories);
    }
  }
}
