import { Action } from '@ngrx/store';
import { Filters } from '../model/Filters';
import { Gift } from '../model/Gift';

export enum SearchActionTypes {
  Search = '[Search] Search',
  SetSearchResults = '[SetSearchResults] Set Search Results'
}

export class Searchs implements Action {
  readonly type = SearchActionTypes.Search;
  constructor(public payload: Filters) { }
}

export class SetSearchResults implements Action {
  readonly type = SearchActionTypes.SetSearchResults;
  constructor(public payload: Gift[]) { }
}

export type SearchActions = Searchs | SetSearchResults;
