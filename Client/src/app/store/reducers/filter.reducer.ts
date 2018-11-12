import { Action } from '@ngrx/store';
import * as fromFilter from '../actions/filter.actions';

export interface State {
  minPoints: number;
  maxPoints: number;
  minLevel: number;
  maxLevel: number;
  genres: String[];
}

export const initialState: State = {
  minPoints: 0,
  maxPoints: 150,
  minLevel: 1,
  maxLevel: 10,
  genres: ['Accion']
};

export function reducer(state = initialState, action: fromFilter.FilterActions): State {
  switch (action.type) {
    case fromFilter.FilterActionTypes.SetLevel:
      return handleSetSearchResults(state, action);
    case fromFilter.FilterActionTypes.SetPoints:
      return handleSetSearchResults(state, action);
    default:
      return state;
  }
}

function handleSetSearchResults(state: State, action: fromFilter.SetLevel | fromFilter.SetPoints): State {
  return {
    ...state
  };
}

export const getMinPoints = (state: State) => state.minPoints;
export const getMaxPoint = (state: State) => state.maxPoints;
export const getMinLevel = (state: State) => state.minLevel;
export const getMaxLevel = (state: State) => state.maxLevel;
export const getGenres = (state: State) => state.genres;
