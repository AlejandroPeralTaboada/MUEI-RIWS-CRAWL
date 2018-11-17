import { Component, OnInit, Input } from '@angular/core';
import { Gift } from 'src/app/store/model/Gift';

@Component({
  selector: 'app-gift-detail',
  templateUrl: './gift-detail.component.html',
  styleUrls: ['./gift-detail.component.css']
})
export class GiftDetailComponent implements OnInit {
  @Input() 
    public gift:Gift;
  constructor() { }

  ngOnInit() { }

  getRemainingTime(el) {
    const time = el.remainingTime;
    const currentDate = new Date().getTime();

    if (time > (currentDate/1000)) {
      // calculate remaining time
      return time;
    } else {
      return 'Expired'
    }
  }

}
