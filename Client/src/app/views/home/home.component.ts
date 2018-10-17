import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items: Observable<any[]>;
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
  }
}
