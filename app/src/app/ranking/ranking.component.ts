import { Component, OnInit } from '@angular/core';

import { RankingOrdemEnum } from '../shared/enums/ranking-ordem.enum';
import { RankingPeriodoEnum } from '../shared/enums/ranking-periodo.enum';
import { TipoEventoJogoEnum } from '../shared/enums/tipo-evento-jogo.enum';
import { JogadorRanking } from '../shared/modelos/jogador-ranking';
import { Jogo } from '../shared/modelos/jogo';
import { JogadoresService } from '../shared/servicos/jogadores.service';
import { JogosService } from '../shared/servicos/jogos.service';
import { DataUtil } from '../shared/util/data.util';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {

  public jogosConsiderados: number;
  public jogadoresRanking: JogadorRanking[];
  private jogosDoAnoCarregados: number;
  public jogosDoAno: any;

  // Seleção de periodicidade do ranking
  public ano: number = DataUtil.ANO_ATUAL;
  public get anoSelecionado(): string {
    return this.ano?.toString();
  }
  public set anoSelecionado(ano: string) {
    this.ano = parseInt(ano);
    this.calculaMesesDisponiveis();
    this.carregarJogosDoAnoSeNecessario();
  }
  public get isAnoAtualSelecionado(): boolean {
    return this.ano === DataUtil.ANO_ATUAL;
  }

  public semestre?: number;
  public get semestreSelecionado(): string {
    return this.semestre?.toString() ?? '';
  }
  public set semestreSelecionado(semestre: string) {
    this.semestre = semestre ? parseInt(semestre) : undefined;
    this.calcularRankings();
  }

  public mes?: number;
  public get mesSelecionado(): string {
    return this.mes?.toString() ?? '';
  }
  public set mesSelecionado(mes: string) {
    this.mes = mes ? parseInt(mes) : undefined;
    this.calcularRankings();
  }
  public mesesDisponiveis: number[] = [1,2,3,4,5,6,7,8,9,10,11,12];

  // Período do ranking
  private periodoRanking: RankingPeriodoEnum = RankingPeriodoEnum.ANUAL;
  public periodoAnual = RankingPeriodoEnum.ANUAL;
  public periodoSemestral = RankingPeriodoEnum.SEMESTRAL;
  public periodoMensal = RankingPeriodoEnum.MENSAL;
  public get isPeriodoAnual(): boolean {
    return this.periodoRanking === RankingPeriodoEnum.ANUAL;
  }
  public get isPeriodoSemestral(): boolean {
    return this.periodoRanking === RankingPeriodoEnum.SEMESTRAL;
  }
  public get isPeriodoMensal(): boolean {
    return this.periodoRanking === RankingPeriodoEnum.MENSAL;
  }
  public anosDisponiveis: number[];
  public get isPeriodoValido(): boolean {
    return this.ano >= DataUtil.ANO_MINIMO && (
      this.isPeriodoAnual
      || (this.isPeriodoSemestral && !!this.semestre)
      || (this.isPeriodoMensal && !!this.mes)
    );
  }

  // Ordenação do ranking
  private ordemRanking: RankingOrdemEnum = RankingOrdemEnum.PONTOS;
  public ordemAssiduidade = RankingOrdemEnum.ASSIDUIDADE;
  public ordemGols = RankingOrdemEnum.GOLS;
  public ordemPontos = RankingOrdemEnum.PONTOS;
  public get isOrdemPontos(): boolean {
    return this.ordemRanking === RankingOrdemEnum.PONTOS;
  }
  public get isOrdemGols(): boolean {
    return this.ordemRanking === RankingOrdemEnum.GOLS;
  }
  public get isOrdemAssiduidade(): boolean {
    return this.ordemRanking === RankingOrdemEnum.ASSIDUIDADE;
  }

  constructor(
    private jogadoresService: JogadoresService,
    private jogosService: JogosService,
  ) {
    this.anosDisponiveis = [];
    for(let a = DataUtil.ANO_MINIMO; a <= this.ano; a++) {
      this.anosDisponiveis.push(a);
    }
    this.calculaMesesDisponiveis();
  }

  ngOnInit(): void {
    this.jogadoresService.buscarJogadores()
      .subscribe(jogadores => {
        this.jogadoresRanking = jogadores as JogadorRanking[];
        this.calcularRankings();
      })
    this.jogosService.carregarJogos();
    
    this.jogosService.carregouJogos.subscribe(() => {
      this.carregarJogosDoAnoSeNecessario();
    });
  }

  private calculaMesesDisponiveis(): void {
    let mesMaximo = (this.isAnoAtualSelecionado ? DataUtil.MES_ATUAL : 12);
    this.mesesDisponiveis = [];
    for (let m = 1; m <= mesMaximo; m++) {
      this.mesesDisponiveis.push(m);
    }
  }

  private carregarJogosDoAnoSeNecessario(): void {
    if (!this.jogosDoAnoCarregados || this.jogosDoAnoCarregados !== this.ano) {
      this.jogosDoAnoCarregados = this.ano;
      this.jogosDoAno = this.jogosService.buscarJogosDoAno(this.ano);
      this.calcularRankings();
    }
  }

  public alterarPeriodicidade(periodicidade: RankingPeriodoEnum) {
    this.periodoRanking = periodicidade;
    this.mesSelecionado = this.isPeriodoMensal && this.isAnoAtualSelecionado ? DataUtil.MES_ATUAL.toString() : '';
    this.semestreSelecionado = this.isPeriodoSemestral && this.isAnoAtualSelecionado ? (DataUtil.MES_ATUAL <= 6 ? 1 : 2).toString() : '';
  }

  public ordenarRanking(ordem: RankingOrdemEnum) {
    this.ordemRanking = ordem;
    this.aplicarOrdenacaoRanking();
  }

  public getNomeMes(mes?: number): string {
    return mes ? DataUtil.getNomeMesLongo(mes) : '';
  }

  private calcularRankings(): void {
    if (!this.jogadoresRanking || !this.isPeriodoValido) {
      return;
    }
    // limpa o ranking anterior
    this.jogadoresRanking.forEach(j => {
      j.pontos = 0;
      j.gols = 0;
      j.assiduidade = 0;
    });
    this.jogosConsiderados = 0;
    if (this.jogosDoAno) {
      // Cria os objetos do ranking com {'jogador-id': 0}
      const ranking = this.jogadoresRanking.reduce((acc,x) => {
        return {...acc, [x.id]: 0};
      }, {});
      const porPontos: any = {...ranking};
      const porGoleadores: any = {...ranking};
      const porAssiduidade: any = {...ranking};
      
      for (var mes in this.jogosDoAno) {
        const mesNum = parseInt(mes);
        if ((this.isPeriodoMensal && mesNum !== this.mes)
        || this.isPeriodoSemestral && ((this.semestre === 1 && mesNum > 6)||(this.semestre === 2 && mesNum <= 6))) {
          continue;
        }
        for (var dia in this.jogosDoAno[mes]) {
          var jogo = this.jogosDoAno[mes][dia] as Jogo;
          if (!jogo.jogadores_branco && !jogo.jogadores_verde) {
            continue;
          }
          this.jogosConsiderados++;

          // Ranking por assiduidade
          let todosJogadores = (jogo.jogadores_branco ?? []).concat(jogo.jogadores_verde ?? []);
          todosJogadores.forEach(j => {
            if (j in porAssiduidade) {
              porAssiduidade[j]++;
            }
          });

          // Ranking por pontos
          let pontosJogo = 3;
          let jogadores: string[] = [];
          if (jogo.golsBranco === jogo.golsVerde) {
            // empate, +1 ponto para todos
            pontosJogo = 1;
            jogadores = todosJogadores;
          } else if (jogo.golsBranco > jogo.golsVerde) {
            // Branco ganhou, jogadores desse time que ganham pontos
            jogadores = jogo.jogadores_branco;
          } else if (jogo.golsBranco < jogo.golsVerde) {
            // Verde ganhou, jogadores desse time que ganham pontos
            jogadores = jogo.jogadores_verde;
          }
          jogadores.forEach(j => {
            if (j in porPontos) {
              porPontos[j] += pontosJogo;
            }
          });

          // Ranking de goleadores
          jogo.eventos?.forEach(evt => {
            // TODO gol contra?
            if (evt.tipo == TipoEventoJogoEnum.GOL) {
              if (evt.jogador in porGoleadores) {
                porGoleadores[evt.jogador]++;
              }
            }
          });
        }
      }

      this.jogadoresRanking.forEach(j => {
        j.pontos = porPontos[j.id];
        j.gols = porGoleadores[j.id];
        j.assiduidade = porAssiduidade[j.id];
      });

      this.aplicarOrdenacaoRanking();
    }
  }

  private aplicarOrdenacaoRanking(): void {
    if (this.ordemRanking === RankingOrdemEnum.PONTOS) {
      this.jogadoresRanking.sort(this.ordenarPorPontos);
    } else if (this.ordemRanking === RankingOrdemEnum.GOLS) {
      this.jogadoresRanking.sort(this.ordenarPorGols);
    } else if (this.ordemRanking === RankingOrdemEnum.ASSIDUIDADE) {
      this.jogadoresRanking.sort(this.ordenarPorAssiduidade);
    }
  }

  private ordenarPorPontos(a: JogadorRanking, b: JogadorRanking): number {
    if (a.pontos === b.pontos) {
      if (a.assiduidade === b.assiduidade) {
        if (a.gols === b.gols) {
          return a.nome.localeCompare(b.nome);
        } else {
          return b.gols - a.gols;
        }
      } else {
        return b.assiduidade - a.assiduidade
      }
    } else {
      return b.pontos - a.pontos;
    }
  }
  private ordenarPorGols(a: JogadorRanking, b: JogadorRanking): number {
    if (a.gols === b.gols) {
      if (a.pontos === b.pontos) {
        if (a.assiduidade === b.assiduidade) {
          return a.nome.localeCompare(b.nome);
        } else {
          return b.assiduidade - a.assiduidade
        }
      } else {
        return b.pontos - a.pontos;
      }
    } else {
      return b.gols - a.gols;
    }
  }
  private ordenarPorAssiduidade(a: JogadorRanking, b: JogadorRanking): number {
    if (a.assiduidade === b.assiduidade) {
      if (a.pontos === b.pontos) {
        if (a.gols === b.gols) {
          return a.nome.localeCompare(b.nome);
        } else {
          return b.gols - a.gols;
        }
      } else {
        return b.pontos - a.pontos;
      }
    } else {
      return b.assiduidade - a.assiduidade
    }
  }

}
