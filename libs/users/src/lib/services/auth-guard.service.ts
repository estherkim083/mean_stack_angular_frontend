import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Buffer } from '../../../../../node_modules/buffer/index';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private localStorageService: LocalstorageService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = this.localStorageService.getToken();
    if (token) {
      const tokenDecode = Buffer.from(token.split('.')[1], 'base64').toString(
        'utf8'
      );
      const decoded = JSON.parse(tokenDecode);
      if (decoded.isAdmin && !this._tokenExpired(decoded.exp)) {
        return true;
      }
    }
    this.router.navigate(['/login']);
    return false;
  }
  private _tokenExpired(expiration): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }
}
