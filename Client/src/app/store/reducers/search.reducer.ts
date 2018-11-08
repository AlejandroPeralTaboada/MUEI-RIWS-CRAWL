import { Action } from '@ngrx/store';
import * as fromSearch from '../actions/search.actions';
import { Gift } from '../model/Gift';

export interface State {
  results: Gift[];
}

export const initialState: State = {
  results: []
};

export function reducer(state = initialState, action: fromSearch.SearchActions): State {
  switch (action.type) {
    case fromSearch.SearchActionTypes.SetSearchResults:
      return handleSetSearchResults(state, action);
    default:
      return state;
  }
}

function handleSetSearchResults(state: State, action: fromSearch.SetSearchResults): State {
  return {
    ...state,
    results: action.payload
  };
}

export const getResults = (state: State) => state.results;
