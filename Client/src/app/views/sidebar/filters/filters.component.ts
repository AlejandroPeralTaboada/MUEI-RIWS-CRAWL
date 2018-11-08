import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Store } from '@ngrx/store';
import { State } from '../../../store/reducers';
import { Search } from 'src/app/store/actions/search.actions';
import { Filters, Range } from 'src/app/store/model/Filters';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  genres = ['Accion', 'FreeToPlay'];
  filters = this.fb.group({
    name: [''],
    genres: this.fb.array(this.genres.map(i => false)),
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

  constructor(private fb: FormBuilder, private store: Store<State>) {}

  ngOnInit() {}

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
