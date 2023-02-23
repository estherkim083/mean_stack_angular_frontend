import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  loginFormGroup!: FormGroup;
  isSubmitted = false;
  authError = false;
  authMessage = 'Email or Password are wrong';

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private localStorageService: LocalstorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._initLoginForm();
  }

  private _initLoginForm() {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  onSubmit() {
    this.isSubmitted = true;
    //if (this.loginFormGroup.valid) return;
    this.auth
      .login(this.loginForm.email.value, this.loginForm.password.value)
      .subscribe(
        (user) => {
          console.log(user);
          this.authError = false;
          this.localStorageService.setToken(user.token);
          this.router.navigate(['/']);
        },
        (error: HttpErrorResponse) => {
          if (error.status !== 400) {
            console.log(error);
            this.authMessage = 'Error in the Server, please try again later!';
          }
          this.authError = true;
        }
      );
  }

  get loginForm() {
    return this.loginFormGroup.controls;
  }
}
