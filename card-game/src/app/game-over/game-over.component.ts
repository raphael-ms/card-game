import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameOverData } from 'src/shared/interface/game-over-data.interface';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.css']
})
export class GameOverComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: GameOverData) {}

  ngOnInit() {
  }

}
