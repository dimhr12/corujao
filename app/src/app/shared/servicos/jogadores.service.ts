import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';

import { Jogador } from '../modelos/jogador';

@Injectable()
export class JogadoresService {

  private DADOS = 'dados/jogadores.json';

  constructor(private http: HttpClient) { }

  buscarJogadores(): Observable<Jogador[]> {
    return this.http.get<Jogador[]>(environment.baseurl + this.DADOS);
  }

}
