import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/users';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.apiUrl + 'users');
  }
  createUser(user: User): Observable<User> {
    return this.http.post<User>(environment.apiUrl + 'users/register', user);
  }
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(environment.apiUrl + 'users/' + user._id, user);
  }
  // eslint-disable-next-line @typescript-eslint/ban-types
  deleteUser(userId: string): Observable<Object> {
    return this.http.delete(environment.apiUrl + 'users/' + userId);
  }
  // eslint-disable-next-line @typescript-eslint/ban-types
  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(environment.apiUrl + 'users/' + userId);
  }
}
