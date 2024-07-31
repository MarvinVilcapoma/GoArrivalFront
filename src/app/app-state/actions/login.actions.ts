import { createAction, props } from '@ngrx/store';
import { MyObject } from 'src/app/app.state';


export const addMyObject = createAction('[My Object] Add', props<{ myObject: MyObject }>());
export const removeMyObject = createAction('[My Object] Remove', props<{ id: number }>());