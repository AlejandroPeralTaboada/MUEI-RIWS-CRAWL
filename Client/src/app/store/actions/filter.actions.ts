import { Action } from '@ngrx/store';
import { Filters } from '../model/Filters';
import { Gift } from '../model/Gift';

export enum FilterActionTypes {
  SetFilters = '[SetFilters]',
  LoadFilters = '[LoadFilters]'
}

export interface Range {
  min: number;
  max: number;
}
export class SetFilters implements Action {
  readonly type = FilterActionTypes.SetFilters;
  constructor(public payload: Filters) {}
}

export class LoadFilters implements Action {
  readonly type = FilterActionTypes.LoadFilters;
  constructor() {}
}

export type FilterActions = SetFilters | LoadFilters;
