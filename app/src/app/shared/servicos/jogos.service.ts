import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

import { AnosMesesJogos } from '../modelos/anos-meses-jogos';
import { Jogo } from '../modelos/jogo';
import { DataService } from './data.service';

@Injectable()
export class JogosService {

  public carregouJogos: EventEmitter<void> = new EventEmitter();

  private URLANOSMESESJOGOS = '/dados/jogos.json';
  private JOGOS: any = {};

  constructor(
    private http: HttpClient,
    private dataService: DataService,
  ) { }

  private getUrlDadoJogos(ano: number, mes: number) {
    var mesFormatado = String(mes).padStart(2, '0');
    return `/dados/jogos_${ano}-${mesFormatado}.json`;
  }

  buscarJogoComDataIso(dataIso: string): Jogo | undefined {
    var anoMesDia = this.dataService.separarAnoMesDiaDataIso(dataIso);
    return this.buscarJogo(anoMesDia[0], anoMesDia[1], anoMesDia[2]);
  }

  buscarJogo(ano: number, mes: number, dia: number): Jogo | undefined {
    if (ano in this.JOGOS && mes in this.JOGOS[ano] && dia in this.JOGOS[ano][mes]) {
      return this.JOGOS[ano][mes][dia];
    }
    return undefined;
  }

  carregarJogos(): void {
    this.http.get<AnosMesesJogos[]>(this.URLANOSMESESJOGOS).subscribe(anosMeses => {
      anosMeses.forEach(anoMes => anoMes.meses.forEach(mes => {
        this.http.get<Jogo[]>(this.getUrlDadoJogos(anoMes.ano, mes)).subscribe(jogos => {
          if (!(anoMes.ano in this.JOGOS)) {
            this.JOGOS[anoMes.ano] = {};
          }
          if (!(mes in this.JOGOS[anoMes.ano])) {
            this.JOGOS[anoMes.ano][mes] = {};
          }
          jogos.forEach(jogo => {
            var dia = this.dataService.obterDiaDoMesDeDataIso(jogo.data);
            this.JOGOS[anoMes.ano][mes][dia] = new Jogo(jogo);
          });
          this.carregouJogos.emit();
        });
      }));
    });
  }

}
