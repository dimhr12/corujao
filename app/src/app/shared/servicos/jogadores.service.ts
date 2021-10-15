import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Jogador } from '../modelos/jogador';

@Injectable()
export class JogadoresService {

  private DADOS = '/dados/jogadores.json';

  constructor(private http: HttpClient) { }

  buscarJogadores() {
    return this.http.get<Jogador[]>(this.DADOS);
  }

}
