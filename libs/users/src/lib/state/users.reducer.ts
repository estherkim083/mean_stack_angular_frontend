// import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import { User } from '../models/user';

import * as UsersActions from './users.actions';
// import { UsersEntity } from './users.models';

export const USERS_FEATURE_KEY = 'users';

// export interface UsersState extends EntityState<UsersEntity> {
//   selectedId?: string | number; // which Users record has been selected
//   loaded: boolean; // has the Users list been loaded
//   error?: string | null; // last known error (if any)
// }
export interface UsersState {
  user: User;
  isAuthenticated: boolean;
}

export interface UsersPartialState {
  readonly [USERS_FEATURE_KEY]: UsersState;
}

export const initialUsersState: UsersState = {
  user: null,
  isAuthenticated: false,
};

// export const usersAdapter: EntityAdapter<UsersEntity> =
//   createEntityAdapter<UsersEntity>();

// export const initialUsersState: UsersState = usersAdapter.getInitialState({
//   // set initial required properties
//   loaded: false,
// });

const usersReducer = createReducer(
  initialUsersState,
  on(UsersActions.buildUserSession, (state) => ({ ...state })),
  on(UsersActions.buildUsersSessionSuccess, (state, action) => ({
    ...state,
    user: action.user,
    isAuthenticated: true,
  })),
  on(UsersActions.buildUsersSessionFailure, (state) => ({
    ...state,
    user: null,
    isAuthenticated: false,
  }))
);

export function reducer(state: UsersState | undefined, action: Action) {
  return usersReducer(state, action);
}
