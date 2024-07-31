import { createReducer, on } from '@ngrx/store';
import { MyObject } from 'src/app/app.state';
import { addMyObject, removeMyObject } from '../actions/login.actions';


export interface MyObjectState {
  myObjects: MyObject[];
}

export const initialState: MyObjectState = {
  myObjects: []
};

export const myObjectReducer = createReducer(
  initialState,
  on(addMyObject, (state, { myObject }) => ({ ...state, myObjects: [...state.myObjects, myObject] })),
  on(removeMyObject, (state, { id }) => ({ ...state, myObjects: state.myObjects.filter(o => o.id !== id) }))
);