import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Gift } from '../model/Gift';
import { Observable, of, forkJoin } from 'rxjs';
import * as SearchActions from '../actions/search.actions';
import * as FilterActions from '../actions/filter.actions';
import { switchMap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Range, Filters } from '../model/Filters';

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions, private httpClient: HttpClient) {}

  @Effect()
  search$: Observable<any> = this.actions$.pipe(
    ofType(SearchActions.SearchActionTypes.Search),
    switchMap(() => {
      return of(new SearchActions.SetSearchResults([]));
      /*return this.httpClient.get<Gift[]>('login').pipe(
        map(userName => {
          return new SearchActions.SetSearchResults(userName);
        })
      );*/
    })
  );

  @Effect()
  setFilters$: Observable<any> = this.actions$.pipe(
    ofType(FilterActions.FilterActionTypes.LoadFilters),
    switchMap(() => {
      const pointsRequest = this.createRangeRequest('requiredPoints');
      const levelRequest = this.createRangeRequest('level');
      const genresRequest = this.getGenres();
      return forkJoin(pointsRequest, levelRequest, genresRequest).pipe(
        map(results => {
          const points = this.getRangeResults(results[0]);
          const level = this.getRangeResults(results[1]);
          const genres: string[] = this.getGenresResults(results[2]);
          const newFilters: Filters = {
            name: '',
            points: points,
            level: level,
            genres: genres.sort(),
            hideExpired: false
          };
          return new FilterActions.SetFilters(newFilters);
        })
      );
    })
  );

  createRangeRequest = (filedName: String) => {
    return this.httpClient.post(environment.url, this.createRangeBody(filedName));
  };
  createRangeBody = (filedName: String) => {
    return {
      size: 0,
      aggs: {
        max: {
          max: { field: filedName }
        },
        min: {
          min: { field: filedName }
        }
      }
    };
  };

  getRangeResults = (data): Range => {
    console.log(data);
    return { min: parseInt(data.aggregations.min.value, 10), max: parseInt(data.aggregations.max.value, 10) };
  };

  getGenres = () => {
    const body = {
      size: 0,
      aggs: {
        genres: {
          terms: { field: 'genres.raw' }
        }
      }
    };
    return this.httpClient.post(environment.url, body);
  };

  getGenresResults = data => data.aggregations.genres.buckets.map(item => item.key);
}
