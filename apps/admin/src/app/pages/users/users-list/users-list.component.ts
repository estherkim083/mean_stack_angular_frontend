import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '@bluebits/users';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-users-list',
  templateUrl: './users-list.component.html',
  styles: [],
})
export class UsersListComponent implements OnInit {
  users = [];
  constructor(
    private usersService: UsersService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}
  ngOnInit(): void {
    this._getUsers();
  }
  private _getUsers() {
    this.usersService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }
  getCountryName(countryName: string) {
    return this.usersService.getCountry(countryName);
  }
  updateUser(userId: string) {
    this.router.navigateByUrl(`users/form/${userId}`);
  }
  deleteUser(userId: string): void {
    this.confirmationService.confirm({
      message: 'Do you want to delete this user?',
      header: 'Delete User',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usersService.deleteUser(userId).subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Service Message',
              detail: 'User is deleted',
            });
            this._getUsers();
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error Message',
              detail: 'User is not deleted',
            });
          }
        );
      },
    });
  }
}
