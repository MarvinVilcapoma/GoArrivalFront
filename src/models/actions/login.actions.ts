import { Action } from '@ngrx/store';
import { Login } from '../login/login.model';


export const ADD_LOGIN = '[Login] Add';

export class AddLogin implements Action {
  readonly type = ADD_LOGIN;

  constructor(public payload: Login) {}
}

export type Actions = AddLogin;