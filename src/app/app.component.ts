import { Component, OnInit } from '@angular/core';
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

import { AppState } from "./reducers";
import { isLoggedIn, isLoggedOut } from "./auth/auth.selectors";
import { logout } from './auth/auth.actions';
import { AuthActions } from './auth/action-types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loading = true;

  // these observable variables are used to show and hide login and logout links in navigation depending whether
  // there is an user in AuthState of Store or not.
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(private router: Router, private store: Store<AppState>) {

  }

  ngOnInit() {

    // here as the app gets initialised we are cheking whether user is available in localStorage or not.
    // If user is there in localStorage then we will dispatch a login action so that loggedIn user may persist
    // or accessed courses page may persist even after browser refresh.
    const userProfile = localStorage.getItem('user');
    if (userProfile) {
      this.store.dispatch(AuthActions.login({ user: JSON.parse(userProfile) }))
    }

    this.router.events.subscribe(event => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });

    //using subscribe will keep on subscribing to store and will keep on updating the value to view
    /*
    this.isLoggedIn$ = this.store.pipe(
      map(state => !!state['auth'].user)
    )

    this.isLoggedOut$ = this.store.pipe(
      map(state => !state['auth'].user)
    )
    */

    // A better way is using selectors
    this.isLoggedIn$ = this.store.pipe(
      select(isLoggedIn)
    )

    this.isLoggedOut$ = this.store.pipe(
      select(isLoggedOut)
    )

  }

  logout() {
    this.store.dispatch(logout());

  }

}
