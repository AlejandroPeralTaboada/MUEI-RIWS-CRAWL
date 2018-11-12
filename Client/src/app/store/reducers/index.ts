import { ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromSearch from './search.reducer';
import * as fromFilters from './filter.reducer';

export interface State {
  search: fromSearch.State;
  filters: fromFilters.State;
}

export const reducers: ActionReducerMap<State> = {
  search: fromSearch.reducer,
  filters: fromFilters.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const selectSearchState = createFeatureSelector<fromSearch.State>('search');
export const getResults = createSelector(selectSearchState, fromSearch.getResults);

export const selectFilterState = createFeatureSelector<fromFilters.State>('filters');
export const getMinPoints = createSelector(selectFilterState, fromFilters.getMinPoints);
export const getMaxPoint = createSelector(selectFilterState, fromFilters.getMaxPoint);
export const getMinLevel = createSelector(selectFilterState, fromFilters.getMinLevel);
export const getMaxLevel = createSelector(selectFilterState, fromFilters.getMaxLevel);
export const getGenres = createSelector(selectFilterState, fromFilters.getGenres);
