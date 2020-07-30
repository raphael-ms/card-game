import { Component, OnInit, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameOverData } from 'src/shared/interface/game-over-data.interface';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.css']
})
export class GameOverComponent implements OnInit {
  @Input() data: GameOverData;


  constructor() {}

  ngOnInit() {
  }

}
