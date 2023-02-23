import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category } from '@bluebits/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [],
})
export class CategoriesFormComponent implements OnInit {
  form: FormGroup;
  isSubmitted = false;
  editMode = false;
  currentCategoryId: string = null;
  color: string;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoriesService,
    private messageService: MessageService,
    private location: Location,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['#fff'],
    });
    this._checkEditMode();
  }
  private _addCategory(category) {
    this.categoryService.createCategory(category).subscribe(
      (category: Category) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Service Message',
          detail: `Category ${category.name} is created`,
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
  private _updateCategory(category) {
    this.categoryService.updateCategory(category).subscribe(
      (category: Category) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Service Message',
          detail: `Category ${category.name} is updated`,
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

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const category: Category = {
      _id: this.currentCategoryId,
      name: this.categoryForm.name.value,
      icon: this.categoryForm.icon.value,
      color: this.categoryForm.color.value,
    };
    if (this.editMode) {
      this._updateCategory(category);
    } else {
      this._addCategory(category);
    }
  }

  get categoryForm() {
    return this.form.controls;
  }

  private _checkEditMode() {
    this.router.params.subscribe((params) => {
      if (params.id) {
        this.currentCategoryId = params.id;
        this.editMode = true;
        this.categoryService
          .getCategoryById(params.id)
          .subscribe((category) => {
            this.categoryForm.name.setValue(category.name);
            this.categoryForm.icon.setValue(category.icon);
            this.categoryForm.color.setValue(category.color);
          });
      }
    });
  }
}
