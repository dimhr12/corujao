import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Jogo } from '../shared/modelos/jogo';

import { JogosService } from '../shared/servicos/jogos.service';
import { DataUtil } from '../shared/util/data.util';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss']
})
export class ResultadosComponent implements OnInit {

  public inputData = new FormControl('');
  public dataSelecionada?: Date;
  public jogo?: Jogo;

  constructor(
    private jogosService: JogosService
  ) { }

  ngOnInit(): void {
    this.jogosService.carregarJogos();
    this.inputData.valueChanges.subscribe((val: string) => this.selecionarData(val));

    this.jogosService.carregouJogos.subscribe(() => {
      // Seleciona o último sábado
      this.selecionarData(DataUtil.formatarDataEmIso(
        DataUtil.isSabado() ? new Date() : DataUtil.obterDataUltimoSabado()
      ))
      // this.selecionarData('2022-03-19'); // Para debug
    });
  }

  selecionarData(dataIso: string) {
    this.dataSelecionada = dataIso ? DataUtil.converterDataIsoParaDate(dataIso) : undefined;
    this.jogo = this.jogosService.buscarJogoComDataIso(dataIso);
  }

}
