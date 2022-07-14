import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Jogador } from '../modelos/jogador';

@Injectable()
export class JogadoresService {

  private DADOS = 'dados/jogadores.json';
  private jogadoresCache: Jogador[];

  constructor(private http: HttpClient) { }

  buscarJogadores(): Observable<Jogador[]> {
    if (this.jogadoresCache) {
      return new Observable<Jogador[]>(subs => subs.next(this.jogadoresCache))
    } else {
      const obs = this.http.get<Jogador[]>(environment.baseurl + this.DADOS)
        .pipe(map(x => x.sort((a, b) => a.nome.localeCompare(b.nome))));
      obs.subscribe(j => this.jogadoresCache = j);
      return obs;
    }
  }

}
