import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '@bluebits/users';
import { User } from '@bluebits/users';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Location } from '@angular/common';
import * as countriesLib from 'i18n-iso-countries';

declare const require;

@Component({
  selector: 'admin-users-form',
  templateUrl: './users-form.component.html',
  styles: [],
})
export class UsersFormComponent implements OnInit {
  editmode = false;
  form: FormGroup;
  isSubmitted = false;
  countries = [];
  imageDisplay: string | ArrayBuffer;
  currentUserId: string;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private messageService: MessageService,
    private location: Location,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._getCountries();
    this._checkEditMode();
  }

  private _checkEditMode() {
    this.router.params.subscribe((params) => {
      if (params.id) {
        this.currentUserId = params.id;
        console.log(params.id);
        this.editmode = true;
        this.usersService.getUserById(params.id).subscribe((user) => {
          this.userForm.name.setValue(user.name);
          this.userForm.city.setValue(user.city);
          this.userForm.email.setValue(user.email);
          this.userForm.isAdmin.setValue(user.isAdmin);
          this.userForm.password.setValue(user.password);
          this.userForm.token.setValue(user.token);
          this.userForm.street.setValue(user.street);
          this.userForm.zip.setValue(user.zip);
          this.userForm.phone.setValue(user.phone);
          this.userForm.country.setValue(user.country);
          console.log(user.country);
          this.userForm.password.setValidators([]);
          this.userForm.password.updateValueAndValidity();
        });
      }
    });
  }
  private _editUser(user: User, id: string) {
    this.usersService.updateUser(user, id).subscribe(
      (user: User) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Service Message',
          detail: `User ${user.name} is updated`,
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
          detail: 'User is not updated',
        });
      }
    );
  }

  private _addUser(user: User) {
    this.usersService.createUser(user).subscribe(
      (user: User) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Service Message',
          detail: `User ${user.name} is created`,
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
          detail: 'User is not created',
        });
      }
    );
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const user: User = {
      name: this.userForm.name.value,
      email: this.userForm.email.value,
      zip: this.userForm.zip.value,
      apartment: this.userForm.apartment.value,
      street: this.userForm.street.value,
      token: this.userForm.token.value,
      password: this.userForm.password.value,
      phone: this.userForm.phone.value,
      country: this.userForm.country.value,
      isAdmin: this.userForm.isAdmin.value,
      city: this.userForm.city.value,
    };
    console.log(user);
    if (this.editmode) {
      this._editUser(user, this.currentUserId);
    } else {
      this._addUser(user);
    }
  }
  onCancel() {}

  private _initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      zip: [''],
      apartment: [''],
      street: [''],
      password: ['', Validators.required],
      token: [''],
      phone: ['', Validators.required],
      isAdmin: [false],
      country: [''],
      city: [''],
    });
  }
  private _getCountries() {
    this.countries = this.usersService.getCountries();
  }

  get userForm() {
    return this.form.controls;
  }
}
