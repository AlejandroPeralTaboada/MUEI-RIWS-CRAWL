import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  genres = ["Accion", "FreeToPlay"]
  filters = this.fb.group({
    name: [''],
    genres: this.fb.array(this.genres.map(i => false)),
    hideOld: true
  })
  minValueLevel: number = 0;
  maxValueLevel: number = 10;
  optionsLevel: Options = {
    floor: 0,
    ceil: 10,
    showTicks: true
  };

  minValuePrice: number = 0;
  maxValuePrice: number = 150;
  optionsPrice: Options = {
    floor: 0,
    ceil: 150
  };

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }


  get genresControl() {
    return this.filters.get('genres') as FormArray;
  }
}
