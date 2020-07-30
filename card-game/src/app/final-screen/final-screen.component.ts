import { Component, OnInit, Inject } from '@angular/core';
import { GameOverData } from 'src/shared/interface/game-over-data.interface';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-final-screen',
  templateUrl: './final-screen.component.html',
  styleUrls: ['./final-screen.component.css']
})
export class FinalScreenComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: GameOverData) { }

  ngOnInit() {
  }

}
