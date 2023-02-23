/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from '@env/environment';
import * as countriesLib from 'i18n-iso-countries';
import { map } from 'rxjs/operators';
import { UsersFacade } from '../state/users.facade';
declare const require;

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  apiURLUsers = environment.apiUrl + 'users';

  constructor(private http: HttpClient, private usersFacade: UsersFacade) {
    countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'));
  }

  getUsersCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiURLUsers}/get/count`)
      .pipe(map((objectValue: any) => objectValue.userCount));
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiURLUsers);
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiURLUsers}/${userId}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiURLUsers + '/register', user);
  }

  updateUser(user: User, id: string): Observable<User> {
    return this.http.put<User>(`${this.apiURLUsers}/${id}`, user);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLUsers}/${userId}`);
  }

  getCountries(): { id: string; name: string }[] {
    return Object.entries(
      countriesLib.getNames('en', { select: 'official' })
    ).map((entry) => {
      return {
        id: entry[0],
        name: entry[1],
      };
    });
  }

  getCountry(countryKey: string): string {
    return countriesLib.getName(countryKey, 'en');
  }

  initAppSession() {
    this.usersFacade.buildUserSession();
  }
  observeCurrentUser() {
    return this.usersFacade.currentUser$;
  }
  isCurrentUserAuth() {
    return this.usersFacade.isAuthenticated$;
  }
}
