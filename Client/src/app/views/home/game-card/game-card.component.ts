import { Component, OnInit, Input } from '@angular/core';
import { GiftCard } from '../../../store/model/Gift';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css']
})
export class GameCardComponent implements OnInit {

  @Input() game:GiftCard
  photo:string
  constructor() { }

  ngOnInit() {
    this.photo = `https://steamcdn-a.akamaihd.net/steam/apps/${this.game.idGame}/header_292x136.jpg` 
  } 

}
