import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-block-ui',
  templateUrl: './block-ui.component.html',
  styleUrls: ['./block-ui.component.css']
})
export class BlockUiComponent implements OnInit {

  constructor() { }

  @Input() isLoading: boolean;

  ngOnInit() {
  }

  Show() {
    this.isLoading = true;
  }


  Hide() {
    this.isLoading = false;
  }
}
