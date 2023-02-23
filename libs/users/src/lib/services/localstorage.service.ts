import { Injectable } from '@angular/core';
import { Buffer } from '../../../../../node_modules/buffer/index';

const TOKEN = 'jwtToken';
@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  setToken(data): void {
    localStorage.setItem(TOKEN, data);
  }

  getToken(): string {
    return localStorage.getItem(TOKEN);
  }
  removeToken(): void {
    localStorage.removeItem(TOKEN);
  }

  isValidToken(): boolean {
    const token = this.getToken();
    if (token) {
      const tokenDecode = Buffer.from(token.split('.')[1], 'base64').toString(
        'utf8'
      );
      const decoded = JSON.parse(tokenDecode);
      if (!this._tokenExpired(decoded.exp)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  private _tokenExpired(expiration): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }
  getUserIdFromToken(): string {
    const token = this.getToken();
    if (token) {
      const tokenDecode = Buffer.from(token.split('.')[1], 'base64').toString(
        'utf8'
      );
      const decoded = JSON.parse(tokenDecode);
      if (decoded) {
        return decoded.userId;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
}
