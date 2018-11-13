import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Gift } from '../model/Gift';
import { Observable, of, forkJoin } from 'rxjs';
import * as SearchActions from '../actions/search.actions';
import * as FilterActions from '../actions/filter.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Range, Filters } from '../model/Filters';

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions, private httpClient: HttpClient) {}

  @Effect()
  search$: Observable<any> = this.actions$.pipe(
    ofType<SearchActions.Search>(SearchActions.SearchActionTypes.Search),
    switchMap(action => {
      return this.httpClient.post(environment.url, this.getSearchRequestBody(action.payload)).pipe(
        map(results => new SearchActions.SetSearchResults(this.getSearchResults(results))),
        catchError(error => {
          console.log(error);
          return of(new SearchActions.SetSearchResults([]));
        })
      );
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

  getSearchRequestBody = (data: Filters) => {
    const def = { from: 0, size: 100 };
    if (!data) {
      return def;
    }
    const mustRequest = [];
    if (data.genres.length !== 0) {
      mustRequest.push({
        terms: {
          genres: data.genres
        }
      });
    }
    if (data.name.trim() !== '') {
      mustRequest.push({
        wildcard: {
          name: `*${data.name}*`
        }
      });
    }
    const filterRequest = [this.getRange('level', data.level), this.getRange('requiredPoints', data.points)];
    if (data.hideExpired) {
      filterRequest.push({
        range: {
          expiresWhen: {
            gte: new Date().getTime()
          }
        }
      });
    }
    return {
      ...def,
      query: {
        bool: {
          must: mustRequest,
          filter: filterRequest
        }
      }
    };
  };

  getRange(name: string, range: Range) {
    const result = { range: {} };
    result.range[name] = {
      gte: range.min,
      lte: range.max
    };
    return result;
  }

  getSearchResults = (results): Gift[] => {
    return results.hits.hits.map(item => this.getItemMapping(item._source));
  };

  getItemMapping = (source): Gift => {
    return {
      idGame: source.idGame,
      idGift: source.idGift,
      name: source.name,
      requiredPoints: source.requiredPoints,
      numberOfCopies: source.numberOfCopies,
      level: source.level,
      entryNumber: source.entryNumber,
      _created: source._created,
      remainingTime: source.remainingTime,
      url: source.url,
      genres: source.genres
    };
  };
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
