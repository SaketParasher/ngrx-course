import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthActions } from "./action-types";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";

// An Effect is something that is done in response to a given Action.So, the Action gets dispatched, its reducer
// gets triggered and then after that we want to do something else.In This effect we After Login Action is
// dispatched we also want to save the user into local storage.
// If we won't add dispatch false then this effect will again dispatch this action.

// Actions is a service from effects package to get the access and notified to any dispatched Action
@Injectable()
export class AuthEffects {

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.login),
      tap((action) => {
        localStorage.setItem('user', JSON.stringify(action.user))
      })
    )
  }, { dispatch: false });

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.logout),
      tap((action) => {
        localStorage.removeItem('user');
        this.router.navigateByUrl('/')
      })
    )
  }, { dispatch: false })

  constructor(private actions$: Actions, private router: Router) {
    // actions$.subscribe(action => {
    //   if (action.type == '[Login Page] User Login') {
    //     localStorage.setItem('user', JSON.stringify(action['user']));
    //   }
    // })
  }

}
