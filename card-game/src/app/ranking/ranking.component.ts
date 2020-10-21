import { Component, OnInit, ViewChild } from '@angular/core';
import { PlayerService } from '../player.service';
import { Player } from 'src/model/player.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PlayerStats } from './model/playerStats.model';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
  private paginator: MatPaginator;
  playersList: PlayerStats[];
  displayedColumns: string[] = ['position', 'name', 'points'];
  dataSource: MatTableDataSource<PlayerStats>;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.playerService.getAll().subscribe(response => {
      this.playersList = response as unknown as PlayerStats[];
      this.playersList.reverse();
      for (let i = 0; i < this.playersList.length; i++) {
        this.playersList[i].position = i + 1;
      }
      this.dataSource = new MatTableDataSource(this.playersList);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
