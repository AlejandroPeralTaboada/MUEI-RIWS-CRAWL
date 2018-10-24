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
  games: GiftCard[];
  constructor(
    private httpClient: HttpClient,
    private store: Store<fromStore.State>
  ) {}

  ngOnInit() {
    const body = {
      from: 0,
      size: 10,
      query: {
        wildcard: {
          user: 'kim*'
        }
      }
    };

    this.httpClient
      .post('http://localhost:9200/test/_search', body)
      .pipe(map(i => i['hits']['hits'].map(e => e['_source'])));

    const giftCard: GiftCard = {
      idGame: 261570,
      name: 'Ori',
      numberOfGifts: 2
    };
    const giftCard2: GiftCard = {
      idGame: 377160,
      name: 'Fallout 4',
      numberOfGifts: 2
    };

    this.games = [giftCard, giftCard2];

    this.items = this.store
      .select(fromStore.getResults)
      .pipe(map(GiftToGiftCard));
  }

  ngAfterViewInit() {
    ELEMENT_QUERIES.init();
  }
}
