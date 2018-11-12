import { Action } from '@ngrx/store';
import { Filters } from '../model/Filters';
import { Gift } from '../model/Gift';

export enum FilterActionTypes {
  SetPoints = '[SetPoints]',
  SetLevel = '[SetLevel]'
}

export interface Range {
  min: number;
  max: number;
}
export class SetPoints implements Action {
  readonly type = FilterActionTypes.SetPoints;
  constructor(public payload: Range) {}
}

export class SetLevel implements Action {
  readonly type = FilterActionTypes.SetLevel;
  constructor(public payload: Range) {}
}

export type FilterActions = SetPoints | SetLevel;
