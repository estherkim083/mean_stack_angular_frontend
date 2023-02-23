import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import * as UsersActions from './users.actions';
// import * as UsersFeature from './users.reducer';

import { catchError, of, concatMap, map } from 'rxjs';
import { LocalstorageService } from '../services/localstorage.service';
import { UsersService } from '../services/users.service';
import { User } from '../models/user';

@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private localstorageService: LocalstorageService,
    private usersService: UsersService
  ) {}
  buildUserSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.buildUserSession),
      concatMap(() => {
        if (this.localstorageService.isValidToken()) {
          const userId = this.localstorageService.getUserIdFromToken();
          if (userId) {
            return this.usersService.getUserById(userId).pipe(
              map((user) => {
                return UsersActions.buildUsersSessionSuccess({ user: user });
              }),
              catchError(() => of(UsersActions.buildUsersSessionFailure()))
            );
          } else {
            return of(UsersActions.buildUsersSessionFailure());
          }
        } else {
          return of(UsersActions.buildUsersSessionFailure());
        }
      })
    )
  );
}
