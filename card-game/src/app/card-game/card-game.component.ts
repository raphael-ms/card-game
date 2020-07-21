import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/model/hero.model';
import { CardGameService } from './card-game.service';
import { PlayerService } from '../player.service';
import { Player } from 'src/model/player.model';
import { UtilsEnum } from 'src/shared/enums/utils.enum';
import { moveIn, fallIn, moveInLeft } from '../router.animations';
import { MatDialog } from '@angular/material/dialog';
import { GameOverComponent } from '../game-over/game-over.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-card-game',
  templateUrl: './card-game.component.html',
  styleUrls: ['./card-game.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: { '[@moveIn]': '' }
})
export class CardGameComponent implements OnInit {
  state = '';
  playerHero: Hero;
  enemyHero: Hero;
  player: Player;
  playerList: Player[];
  score = 0;
  result = '';
  key: string;
  showEnemy = false;
  showIntelligence = false;
  showStrength = false;
  showSpeed = false;
  showDurability = false;
  showPower = false;
  showCombat = false;
  showPowerStatsCard = true;
  userLogged;
  combatOption = true;
  powerOption = true;
  durabilityOption = true;
  speedOption = true;
  strengthOption = true;
  IntelligenceOption = true;
  randomSkill = false;
  playerKey: string;
  isClickEnable = true;

  showLoading = true;

  constructor(
    private cardGameService: CardGameService,
    private playerService: PlayerService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getEnemyHero();
    this.getPlayerHero();
    this.userLogged = JSON.parse(localStorage.getItem('user'));
    const displayName = JSON.parse(localStorage.getItem('displayName'));
    this.playerService.getItemList(this.userLogged.uid).subscribe(playerList => {
      if (playerList.length === 0) {
        this.player = new Player();
        if (displayName !== null) {
          this.player.name = displayName;
        } else {
          this.player.name = this.userLogged.displayName;
        }
        this.player.maxScore = 0;
        this.player.coins = UtilsEnum.INITIAL_COINS;
        this.playerService.insert(this.userLogged.uid, this.player);
      } else {
        this.playerKey = playerList[0].key;
        this.player = playerList[0] as unknown as Player;
      }
      this.showLoading = false;
    });
  }

  getRandomNumber(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  gameOver() {
    const dialogRef = this.dialog.open(GameOverComponent, {
      data: { player: this.player, score: this.score }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (this.player.maxScore < this.score) {
        this.player.maxScore = this.score;
      }
      this.playerService.update(this.player, this.userLogged.uid, this.playerKey);
      this.score = 0;
      this.refreshHeroesInsta();
    });
  }

  getPlayerHero() {
    this.showLoading = true;
    const id = '' + this.getRandomNumber(1, 731);
    this.cardGameService.getHero(id).subscribe(heroResult => {
      this.playerHero = heroResult;
      if (this.playerHero.powerstats !== null) {
        if (this.playerHero.powerstats.combat === 'null' || this.playerHero.powerstats.durability === 'null' ||
          this.playerHero.powerstats.intelligence === 'null' || this.playerHero.powerstats.power === 'null' ||
          this.playerHero.powerstats.speed === 'null' || this.playerHero.powerstats.strength === 'null') {
          this.getPlayerHero();
        }
      }
      this.showLoading = false;
    });
  }

  getEnemyHero() {
    this.showLoading = true;
    this.hideEnemyCard();
    const id = '' + this.getRandomNumber(1, 731);
    this.cardGameService.getHero(id).subscribe(heroResult => {
      this.enemyHero = heroResult;
      if (this.enemyHero.powerstats !== null) {
        if (this.enemyHero.powerstats.combat === 'null' || this.enemyHero.powerstats.durability === 'null'
          || this.enemyHero.powerstats.intelligence === 'null' || this.enemyHero.powerstats.power === 'null'
          || this.enemyHero.powerstats.speed === 'null' || this.enemyHero.powerstats.strength === 'null') {
          this.getEnemyHero();
        }
      }
      this.showLoading = false;
    });
  }

  refreshHeroes() {
    if (this.score !== 0 && this.score % 10 === 0) {
      this.player.coins += 1;
      this.playerService.update(this.player, this.userLogged.uid, this.playerKey);
    }
    setTimeout(x => {
      this.getPlayerHero();
      this.getEnemyHero();
      this.isClickEnable = true;
      this.result = '';
      this.randomSkill = false;
      this.hideEnemyCard();
      this.showOptionSkill();
      this.showLoading = true;
    }, 3000);

    setTimeout(x => {
      this.showLoading = false;
    }, 4000);
  }

  refreshHeroesInsta() {
    if (this.score !== 0 && this.score % 10 === 0) {
      this.player.coins += 1;
      this.playerService.update(this.player, this.userLogged.uid, this.playerKey);
    }
    this.getPlayerHero();
    this.getEnemyHero();
    this.isClickEnable = true;
    this.result = '';
    this.randomSkill = false;
    this.hideEnemyCard();
    this.showOptionSkill();
  }

  checkIntelligence() {
    if (this.isClickEnable) {
      this.isClickEnable = false;
      this.unhideEnemyCard();
      if (parseInt(this.playerHero.powerstats.intelligence) > parseInt(this.enemyHero.powerstats.intelligence)) {
        this.score++;
        this.result = UtilsEnum.MATCH_VICTORY;
        this.refreshHeroes();
        return;
      }
      if (parseInt(this.playerHero.powerstats.intelligence) === parseInt(this.enemyHero.powerstats.intelligence)) {
        this.result = UtilsEnum.MATCH_DRAW;
        this.refreshHeroes();
        return;
      }
      if (parseInt(this.playerHero.powerstats.intelligence) < parseInt(this.enemyHero.powerstats.intelligence)) {
        this.gameOver();
        return;
      }
    }
  }

  checkStrength() {
    if (this.isClickEnable) {
      this.isClickEnable = false;
      this.unhideEnemyCard();
      if (parseInt(this.playerHero.powerstats.strength) > parseInt(this.enemyHero.powerstats.strength)) {
        this.score++;
        this.result = UtilsEnum.MATCH_VICTORY;
        this.refreshHeroes();
        return;
      }
      if (parseInt(this.playerHero.powerstats.strength) === parseInt(this.enemyHero.powerstats.strength)) {
        this.refreshHeroes();
        this.result = UtilsEnum.MATCH_DRAW;
        return;
      }
      if (parseInt(this.playerHero.powerstats.strength) < parseInt(this.enemyHero.powerstats.strength)) {
        this.gameOver();
        return;
      }
    }
  }

  checkSpeed() {
    if (this.isClickEnable) {
      this.isClickEnable = false;
      this.unhideEnemyCard();
      if (parseInt(this.playerHero.powerstats.speed) > parseInt(this.enemyHero.powerstats.speed)) {
        this.score++;
        this.result = UtilsEnum.MATCH_VICTORY;
        this.refreshHeroes();
        return;
      }
      if (parseInt(this.playerHero.powerstats.speed) === parseInt(this.enemyHero.powerstats.speed)) {
        this.result = UtilsEnum.MATCH_DRAW;
        this.refreshHeroes();
        return;
      }
      if (parseInt(this.playerHero.powerstats.speed) < parseInt(this.enemyHero.powerstats.speed)) {
        this.gameOver();
        return;
      }
    }
  }

  checkDurability() {
    if (this.isClickEnable) {
      this.isClickEnable = false;
      this.unhideEnemyCard();
      if (parseInt(this.playerHero.powerstats.durability) > parseInt(this.enemyHero.powerstats.durability)) {
        this.score++;
        this.result = UtilsEnum.MATCH_VICTORY;
        this.refreshHeroes();
        return;
      }
      if (parseInt(this.playerHero.powerstats.durability) === parseInt(this.enemyHero.powerstats.durability)) {
        this.result = UtilsEnum.MATCH_DRAW;
        this.refreshHeroes();
        return;
      }
      if (parseInt(this.playerHero.powerstats.durability) < parseInt(this.enemyHero.powerstats.durability)) {
        this.gameOver();
        return;
      }
    }
  }

  checkPower() {
    if (this.isClickEnable) {
      this.isClickEnable = false;
      this.unhideEnemyCard();
      if (parseInt(this.playerHero.powerstats.power) > parseInt(this.enemyHero.powerstats.power)) {
        this.score++;
        this.result = UtilsEnum.MATCH_VICTORY;
        this.refreshHeroes();
        return;
      }
      if (parseInt(this.playerHero.powerstats.power) === parseInt(this.enemyHero.powerstats.power)) {
        this.result = UtilsEnum.MATCH_DRAW;
        this.refreshHeroes();
        return;
      }
      if (parseInt(this.playerHero.powerstats.power) < parseInt(this.enemyHero.powerstats.power)) {
        this.gameOver();
        return;
      }
    }
  }

  checkCombat() {
    if (this.isClickEnable) {
      this.isClickEnable = false;
      this.unhideEnemyCard();
      if (parseInt(this.playerHero.powerstats.combat) > parseInt(this.enemyHero.powerstats.combat)) {
        this.score++;
        this.result = UtilsEnum.MATCH_VICTORY;
        this.refreshHeroes();
        return;
      }
      if (parseInt(this.playerHero.powerstats.combat) === parseInt(this.enemyHero.powerstats.combat)) {
        this.result = UtilsEnum.MATCH_DRAW;
        this.refreshHeroes();
        return;
      }
      if (parseInt(this.playerHero.powerstats.combat) < parseInt(this.enemyHero.powerstats.combat)) {
        this.gameOver();
        return;
      }
    }
  }

  unhideEnemyCard() {
    this.showEnemy = true;
    this.showIntelligence = true;
    this.showStrength = true;
    this.showSpeed = true;
    this.showDurability = true;
    this.showPower = true;
    this.showCombat = true;
  }

  hideEnemyCard() {
    this.showEnemy = false;
    this.showIntelligence = false;
    this.showStrength = false;
    this.showSpeed = false;
    this.showDurability = false;
    this.showPower = false;
    this.showCombat = false;
  }

  changeCard() {
    if (this.player.coins >= 3) {
      this.player.coins -= 3;
      this.playerService.update(this.player, this.userLogged.uid, this.playerKey);
      this.getPlayerHero();
      this.getEnemyHero();
    } else {
      this.openSnackBar(UtilsEnum.NO_COINS);
    }
  }

  showOptionSkill() {
    this.combatOption = true;
    this.powerOption = true;
    this.durabilityOption = true;
    this.speedOption = true;
    this.strengthOption = true;
    this.IntelligenceOption = true;

  }

  showSkill(skill: string) {
    if (this.player.coins >= 3) {
      this.player.coins -= 3;
      this.playerService.update(this.player, this.userLogged.uid, this.playerKey);
      if (skill === 'power') {
        this.showPower = true;
        this.powerOption = false;
      }
      if (skill === 'combat') {
        this.showCombat = true;
        this.combatOption = false;
      }
      if (skill === 'durability') {
        this.showDurability = true;
        this.durabilityOption = false;
      }
      if (skill === 'intelligence') {
        this.showIntelligence = true;
        this.IntelligenceOption = false;
      }
      if (skill === 'speed') {
        this.showSpeed = true;
        this.speedOption = false;
      }
      if (skill === 'strength') {
        this.showStrength = true;
        this.strengthOption = false;
      }
    } else {
      this.openSnackBar(UtilsEnum.NO_COINS);
    }

  }

  showAboutCard() {
    this.showPowerStatsCard = false;
  }

  showPowerStatus() {
    this.showPowerStatsCard = true;
  }
  showRandomSkill() {
    if (this.player.coins >= 1) {
      this.player.coins--;
      this.randomSkill = true;
      const skill = '' + this.getRandomNumber(1, 6);
      if (skill === '1') {
        this.showIntelligence = true;
        this.IntelligenceOption = false;
      }
      if (skill === '2') {
        this.showStrength = true;
        this.strengthOption = false;
      }
      if (skill === '3') {
        this.showSpeed = true;
        this.speedOption = false;
      }
      if (skill === '4') {
        this.showDurability = true;
        this.durabilityOption = false;
      }
      if (skill === '5') {
        this.showCombat = true;
        this.combatOption = false;
      }
      if (skill === '6') {
        this.showPower = true;
        this.powerOption = false;
      }
    } else {
      this.openSnackBar(UtilsEnum.NO_COINS);
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      verticalPosition: 'top'
    });
  }

}


