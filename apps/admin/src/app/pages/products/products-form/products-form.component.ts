import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  CategoriesService,
  Product,
  ProductsService,
} from '@bluebits/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
  styles: [],
})
export class ProductsFormComponent implements OnInit {
  editmode = false;
  form: FormGroup;
  isSubmitted = false;
  categories = [];
  imageDisplay: string | ArrayBuffer;
  currentCategoryId: string;

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private messageService: MessageService,
    private location: Location,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
    this._checkEditMode();
  }

  private _checkEditMode() {
    this.router.params.subscribe((params) => {
      if (params.id) {
        this.currentCategoryId = params.id;
        this.editmode = true;
        this.productsService.getProductById(params.id).subscribe((product) => {
          this.productForm.name.setValue(product.name);
          this.productForm.brand.setValue(product.brand);
          this.productForm.price.setValue(product.price);
          this.productForm.category.setValue(product.category._id);
          this.productForm.countInStock.setValue(product.countInStock);
          this.productForm.description.setValue(product.description);
          this.productForm.richDescription.setValue(product.richDescription);
          this.productForm.isFeatured.setValue(product.isFeatured);
          this.imageDisplay = product.image;
          this.productForm.image.setValidators([]);
          this.productForm.image.updateValueAndValidity();
        });
      }
    });
  }
  private _editProduct(productFormData: FormData) {
    this.productsService
      .updateProduct(productFormData, this.currentCategoryId)
      .subscribe(
        (product: Product) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Service Message',
            detail: `Product ${product.name} is updated`,
          });
          timer(1000)
            .toPromise()
            .then(() => {
              this.location.back();
            });
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error Message',
            detail: 'Category is not updated',
          });
        }
      );
  }

  private _addProduct(productData: FormData) {
    this.productsService.createProduct(productData).subscribe(
      (product: Product) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Service Message',
          detail: `Product ${product.name} is created`,
        });
        timer(1000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error Message',
          detail: 'Category is not created',
        });
      }
    );
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const productFormData = new FormData();
    Object.keys(this.productForm).map((key) => {
      productFormData.append(key, this.productForm[key].value);
    });
    if (this.editmode) {
      this._editProduct(productFormData);
    } else {
      this._addProduct(productFormData);
    }
  }
  onCancel() {}

  onImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      console.log(file);
      this.form.patchValue({ image: file });
      this.form.get('image').updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    }
  }

  private _initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: ['', Validators.required],
      isFeatured: [false],
    });
  }
  private _getCategories() {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  get productForm() {
    return this.form.controls;
  }
}
