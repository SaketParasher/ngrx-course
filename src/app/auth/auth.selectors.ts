import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from './reducers';

// A Selector is a plain mapping function with memory. we used these selectors to query our state
// and fetch data that our view needs

// Creating a feature selector to create type safe selectors. We will use this feature selector to select auth state.
const selectAuthState = createFeatureSelector<AuthState>("auth");

export const isLoggedIn = createSelector(
  //state => state['auth'],
  selectAuthState,
  auth => !!auth.user
)

export const isLoggedOut = createSelector(
  isLoggedIn,
  loggedIn => !loggedIn
)
