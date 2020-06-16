import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/model/hero.model';
import { CardGameService } from './card-game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  playerHero: Hero;
  enemyHero: Hero;
  score = 0;
  coins = 10;
  result = '';
  showEnemy = false;
  showIntelligene = false;
  showStrength = false;
  showSpeed = false;
  showDurability = false;
  showPower = false;
  showCombat = false;

  constructor(private cardGameService: CardGameService) { }

  ngOnInit() {
    this.getEnemyHero();
    this.getPlayerHero();
  }

  getRandomId(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getPlayerHero() {
    const id = '' + this.getRandomId(1, 731);
    this.cardGameService.getHero(id).subscribe(heroResult => {
      this.playerHero = heroResult;
      if (this.playerHero.powerstats !== null) {
        if (this.playerHero.powerstats.combat === 'null' || this.playerHero.powerstats.durability === 'null' ||
          this.playerHero.powerstats.intelligence === 'null' || this.playerHero.powerstats.power === 'null' ||
          this.playerHero.powerstats.speed === 'null' || this.playerHero.powerstats.strength === 'null') {
          this.getPlayerHero();
        }
      }
    });
  }

  getEnemyHero() {
    const id = '' + this.getRandomId(1, 731);
    this.cardGameService.getHero(id).subscribe(heroResult => {
      this.enemyHero = heroResult;
      if (this.enemyHero.powerstats !== null) {
        if (this.enemyHero.powerstats.combat === 'null' || this.enemyHero.powerstats.durability === 'null'
          || this.enemyHero.powerstats.intelligence === 'null' || this.enemyHero.powerstats.power === 'null'
          || this.enemyHero.powerstats.speed === 'null' || this.enemyHero.powerstats.strength === 'null') {
          this.getEnemyHero();
        }
      }
    });
  }

  refreshHeroes() {

    setTimeout(x => {
      this.getPlayerHero();
      this.getEnemyHero();
      this.result = '';
      this.hideEnemyCard();
    }, 2000);
  }

  checkIntelligence() {
    this.unhideEnemyCard();
    if (parseInt(this.playerHero.powerstats.intelligence) > parseInt(this.enemyHero.powerstats.intelligence)) {
      this.score++;
      this.result = 'VITÓRIA';
      this.refreshHeroes();
      return;
    }
    if (parseInt(this.playerHero.powerstats.intelligence) === parseInt(this.enemyHero.powerstats.intelligence)) {
      this.result = 'EMPATE';
      this.refreshHeroes();
      return;
    }
    if (parseInt(this.playerHero.powerstats.intelligence) < parseInt(this.enemyHero.powerstats.intelligence)) {
      this.score = 0;
      this.result = 'DERROTA';
      this.refreshHeroes();
      return;
    }
  }

  checkStrength() {
    this.unhideEnemyCard();
    if (parseInt(this.playerHero.powerstats.strength) > parseInt(this.enemyHero.powerstats.strength)) {
      this.score++;
      this.result = 'VITÓRIA';
      this.refreshHeroes();
      return;
    }
    if (parseInt(this.playerHero.powerstats.strength) === parseInt(this.enemyHero.powerstats.strength)) {
      this.refreshHeroes();
      this.result = 'EMPATE';
      return;
    }
    if (parseInt(this.playerHero.powerstats.strength) < parseInt(this.enemyHero.powerstats.strength)) {
      this.score = 0;
      this.result = 'DERROTA';
      this.refreshHeroes();
      return;
    }
  }

  checkSpeed() {
    this.unhideEnemyCard();
    if (parseInt(this.playerHero.powerstats.speed) > parseInt(this.enemyHero.powerstats.speed)) {
      this.score++;
      this.result = 'VITÓRIA';
      this.refreshHeroes();
      return;
    }
    if (parseInt(this.playerHero.powerstats.speed) === parseInt(this.enemyHero.powerstats.speed)) {
      this.result = 'EMPATE';
      this.refreshHeroes();
      return;
    }
    if (parseInt(this.playerHero.powerstats.speed) < parseInt(this.enemyHero.powerstats.speed)) {
      this.score = 0;
      this.result = 'DERROTA';
      this.refreshHeroes();
      return;
    }
  }

  checkDurability() {
    this.unhideEnemyCard();
    if (parseInt(this.playerHero.powerstats.durability) > parseInt(this.enemyHero.powerstats.durability)) {
      this.score++;
      this.result = 'VITÓRIA';
      this.refreshHeroes();
      return;
    }
    if (parseInt(this.playerHero.powerstats.durability) === parseInt(this.enemyHero.powerstats.durability)) {
      this.result = 'EMPATE';
      this.refreshHeroes();
      return;
    }
    if (parseInt(this.playerHero.powerstats.durability) < parseInt(this.enemyHero.powerstats.durability)) {
      this.score = 0;
      this.result = 'DERROTA';
      this.refreshHeroes();
      return;
    }
  }

  checkPower() {
    this.unhideEnemyCard();
    if (parseInt(this.playerHero.powerstats.power) > parseInt(this.enemyHero.powerstats.power)) {
      this.score++;
      this.result = 'VITÓRIA';
      this.refreshHeroes();
      return;
    }
    if (parseInt(this.playerHero.powerstats.power) === parseInt(this.enemyHero.powerstats.power)) {
      this.result = 'EMPATE';
      this.refreshHeroes();
      return;
    }
    if (parseInt(this.playerHero.powerstats.power) < parseInt(this.enemyHero.powerstats.power)) {
      this.score = 0;
      this.result = 'DERROTA';
      this.refreshHeroes();
      return;
    }
  }

  checkCombat() {
    this.unhideEnemyCard();
    if (parseInt(this.playerHero.powerstats.combat) > parseInt(this.enemyHero.powerstats.combat)) {
      this.score++;
      this.result = 'VITÓRIA';
      this.refreshHeroes();
      return;
    }
    if (parseInt(this.playerHero.powerstats.combat) === parseInt(this.enemyHero.powerstats.combat)) {
      this.result = 'EMPATE';
      this.refreshHeroes();
      return;
    }
    if (parseInt(this.playerHero.powerstats.combat) < parseInt(this.enemyHero.powerstats.combat)) {
      this.score = 0;
      this.result = 'DERROTA';
      this.refreshHeroes();
      return;
    }
  }

  unhideEnemyCard() {
    this.showEnemy = true;
    this.showIntelligene = true;
    this.showStrength = true;
    this.showSpeed = true;
    this.showDurability = true;
    this.showPower = true;
    this.showCombat = true;
  }

  hideEnemyCard() {
    this.showEnemy = false;
    this.showIntelligene = false;
    this.showStrength = false;
    this.showSpeed = false;
    this.showDurability = false;
    this.showPower = false;
    this.showCombat = false;
  }

  changeCard() {
    if (this.coins >= 1) {
      this.coins--;
      this.getPlayerHero();
    }
  }

}
