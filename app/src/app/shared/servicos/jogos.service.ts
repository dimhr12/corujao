import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';

import { Jogo } from '../modelos/jogo';
import { DataUtil } from '../util/data.util';

@Injectable()
export class JogosService {

  public carregouJogos: EventEmitter<void> = new EventEmitter();

  /// JOGOS[ano][mes][dia]: Jogo
  private JOGOS: Record<number, Record<number, Record<number, Jogo>>> = {};

  constructor(
    private http: HttpClient,
  ) { }

  private getUrlJogosDoAno(ano: number) {
    return environment.baseurl + `dados/jogos_${ano}.json`;
  }

  buscarJogoComDataIso(dataIso: string): Jogo | undefined {
    var anoMesDia = DataUtil.separarAnoMesDiaDataIso(dataIso);
    return this.buscarJogo(anoMesDia[0], anoMesDia[1], anoMesDia[2]);
  }

  buscarJogo(ano: number, mes: number, dia: number): Jogo | undefined {
    const jogos = this.buscarJogosDoMes(ano, mes);
    if (jogos && dia in jogos) {
      return jogos[dia];
    }
    return undefined;
  }

  buscarJogosDoMes(ano: number, mes: number): Record<number, Jogo> | undefined {
    const jogos = this.buscarJogosDoAno(ano);
    if (jogos && mes in jogos) {
      return jogos[mes];
    }
    return undefined;
  }

  buscarJogosDoAno(ano: number): Record<number, Record<number, Jogo>> | undefined {
    if (ano in this.JOGOS) {
      return this.JOGOS[ano];
    }
    return undefined;
  }

  carregarJogos(): void {
    for (let ano = DataUtil.ANO_MINIMO; ano <= DataUtil.ANO_ATUAL; ano++) {
      this.http.get<Jogo[]>(this.getUrlJogosDoAno(ano)).subscribe(jogos => {
        if (!(ano in this.JOGOS)) {
          this.JOGOS[ano] = {};
        }
        jogos.forEach(jogo => {
          let mes = DataUtil.obterMesDeDataIso(jogo.data);
          if (!(mes in this.JOGOS[ano])) {
            this.JOGOS[ano][mes] = {};
          }
          var dia = DataUtil.obterDiaDoMesDeDataIso(jogo.data);
          this.JOGOS[ano][mes][dia] = new Jogo(jogo);
        });
        this.carregouJogos.emit();
      });
    }
  }

}
