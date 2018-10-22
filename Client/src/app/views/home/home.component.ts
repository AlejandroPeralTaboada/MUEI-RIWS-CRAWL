import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GiftCard } from '../../store/model/Gift';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items: Observable<any[]>;
  games: GiftCard[];
  constructor(private httpClient: HttpClient) {}

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

    this.items = this.httpClient
      .post('http://localhost:9200/test/_search', body)
      .pipe(map(i => i['hits']['hits'].map(e => e['_source'])));
  
    const giftCard:GiftCard = {idGame:261570,name:"Ori",numberOfGifts:2}
    const giftCard2:GiftCard = {idGame:377160,name:"Fallout 4",numberOfGifts:2}
    
    this.games = [giftCard,giftCard2];
  
    }


}
