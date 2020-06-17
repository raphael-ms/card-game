import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Hero } from 'src/model/hero.model';

@Injectable({
  providedIn: 'root'
})
export class CardGameService {
  API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  getHero(id: string): Observable<Hero> {
    return this.http.get<Hero>(`${this.API_URL}${id}`);
  }
}
