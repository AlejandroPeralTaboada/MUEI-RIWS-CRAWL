import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GiftCard, GiftToGiftCard } from '../../store/model/Gift';
import * as fromStore from '../../store/reducers/index';
import { Store } from '@ngrx/store';
import * as RESIZE_SENSOR from 'node_modules/css-element-queries/src/ResizeSensor.js';
import * as ELEMENT_QUERIES from 'node_modules/css-element-queries/src/ElementQueries.js';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  items: Observable<GiftCard[]>;
  constructor(private store: Store<fromStore.State>) {}

  ngOnInit() {
    this.items = this.store.select(fromStore.getResults).pipe(map(i => i.map(GiftToGiftCard)));
  }

  ngAfterViewInit() {
    ELEMENT_QUERIES.init();
  }
}
