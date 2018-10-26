import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Gift } from '../model/Gift';
import { Observable } from 'rxjs';
import * as SearchActions from '../actions/search.actions'
import { switchMap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppEffects {

  constructor(private actions$: Actions, private httpClient: HttpClient) { }

  @Effect()
  search$: Observable<any> = this.actions$.pipe(
    ofType(SearchActions.SearchActionTypes.Search),
    switchMap(() => {
      return this.httpClient.get<Gift[]>('login')
        .pipe(
          map((userName) => {
            return new SearchActions.SetSearchResults(userName);
          })
        )
    })
  );

  createFilters = () => {

  }
}
