import { Component, OnInit, OnDestroy } from '@angular/core';
import { Options } from 'ng5-slider';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Store } from '@ngrx/store';
import { State, getGenres, getMinLevel, getMaxLevel, getMinPoints, getMaxPoint } from '../../../store/reducers';
import { Search } from 'src/app/store/actions/search.actions';
import { Filters, Range } from 'src/app/store/model/Filters';
import { Observable, Subscription } from '../../../../../node_modules/rxjs';
import { LoadFilters } from '../../../store/actions/filter.actions';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, OnDestroy {
  genres: Observable<String[]>;
  filters = this.fb.group({
    name: [''],
    genres: this.fb.array([]),
    hideOld: true
  });
  minValueLevel = 0;
  maxValueLevel = 10;
  optionsLevel: Options = {
    floor: 0,
    ceil: 10,
    showTicks: true
  };

  minValuePrice = 0;
  maxValuePrice = 150;
  optionsPrice: Options = {
    floor: 0,
    ceil: 150
  };

  subscription: Subscription[] = [];
  constructor(private fb: FormBuilder, private store: Store<State>) {}

  ngOnInit() {
    this.genres = this.store.select(getGenres);
    this.subscription.push(
      this.genres.subscribe(g => {
        console.log(g);
        this.filters.controls['genres'] = this.fb.array(g.map(i => false));
      })
    );
    this.subscription.push(
      this.store.select(getMinLevel).subscribe(level => {
        console.log(level);
        this.optionsLevel = { ...this.optionsLevel, floor: level };
        this.minValueLevel = Math.max(level, this.minValueLevel);
      })
    );
    this.subscription.push(
      this.store.select(getMaxLevel).subscribe(level => {
        console.log(level);
        this.optionsLevel = { ...this.optionsLevel, ceil: level };
        this.maxValueLevel = Math.min(level, this.maxValueLevel);
      })
    );
    this.subscription.push(
      this.store.select(getMinPoints).subscribe(level => {
        console.log(level);
        this.optionsPrice = { ...this.optionsPrice, floor: level };
        this.minValuePrice = Math.max(level, this.minValuePrice);
      })
    );
    this.subscription.push(
      this.store.select(getMaxPoint).subscribe(level => {
        console.log(level);
        this.optionsPrice = { ...this.optionsPrice, ceil: level };
        this.maxValuePrice = Math.min(level, this.maxValuePrice);
      })
    );
    this.store.dispatch(new LoadFilters());
  }

  ngOnDestroy() {
    this.subscription.forEach(i => i.unsubscribe());
  }

  get genresControl() {
    return this.filters.get('genres') as FormArray;
  }

  summit() {
    const value = this.filters.value;
    const genres = value.genres
      .map((item, index) => {
        if (item) {
          return this.genres[index];
        } else {
          return null;
        }
      })
      .filter(i => i != null);
    const points: Range = { min: this.minValuePrice, max: this.maxValuePrice };
    const level: Range = { min: this.minValueLevel, max: this.maxValueLevel };
    const data: Filters = {
      name: value.name,
      genres: genres,
      hideExpired: value.hideOld,
      points: points,
      level: level
    };
    this.store.dispatch(new Search(data));
  }
}
