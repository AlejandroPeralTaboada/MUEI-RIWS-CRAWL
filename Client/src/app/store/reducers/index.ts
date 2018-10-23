import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromSearch from './search.reducer';

export interface State {

  search: fromSearch.State;
}

export const reducers: ActionReducerMap<State> = {

  search: fromSearch.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const selectSearchState = createFeatureSelector<fromSearch.State>('search');
export const getResults = createSelector(selectSearchState, fromSearch.getResults);
