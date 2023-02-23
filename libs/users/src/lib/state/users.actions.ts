import { createAction, props } from '@ngrx/store';
import { User } from '../models/user';

export const buildUserSession = createAction('[Users] Build User Session');

// export const initUsers = createAction('[Users Page] Init');

export const buildUsersSessionSuccess = createAction(
  '[Users/API] Build User Session Success',
  props<{ user: User }>()
);

export const buildUsersSessionFailure = createAction(
  '[Users/API] Build User Session Failure'
);
