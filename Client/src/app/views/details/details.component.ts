import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AppEffects } from 'src/app/store/effects/app.effects';
import { Observable } from 'rxjs';
import { Gift } from 'src/app/store/model/Gift';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  public gameId = '356650';
  public giftList$:Observable<Gift[]>;
  constructor(private route: ActivatedRoute, private httpClient:HttpClient, private appEffects:AppEffects) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.gameId = params['id'];
      this.giftList$ = this.httpClient.get(environment.url + '?q=idGame:' + this.gameId).pipe(map(this.appEffects.getSearchResults))
    });
  }

  getBody() {
    // devolver objeto que sea la query
    return {};
  }
}
