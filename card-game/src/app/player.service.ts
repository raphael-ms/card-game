import { Injectable, NgZone } from '@angular/core';
import { Player } from '../model/player.model';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  userId: string;

  constructor(private db: AngularFireDatabase, private auth: AngularFireAuth, private ngZone: NgZone, public router: Router) {
    this.auth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      } else {
        this.userId = null;
        this.ngZone.run(() => this.router.navigate(['login'])).then();
      }
    });
  }


  getItemList(uid: string) {
      return this.db.list(`player/${uid}`).snapshotChanges()
        .pipe(
          map(changes => {
            return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
          })
        );
  }

  insert(key: string, player: Player) {
    this.db.list(`player/${key}`).push(player)
      .then((result: any) => {
        console.log(result.key);
      });
  }

  update(player: Player, uid: string, key: string) {
    this.db.list(`player/${uid}`).update(key, player)
      .catch((error: any) => {
        console.error(error);
      });
  }

  getAll() {
    return this.db.list('player')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
      );
  }

  delete(key: string) {
    this.db.object(`player/${key}`).remove();
  }
}
