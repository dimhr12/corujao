import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Jogo } from '../shared/modelos/jogo';

import { DataService } from '../shared/servicos/data.service';
import { JogosService } from '../shared/servicos/jogos.service';

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
    private dataService: DataService,
    private jogosService: JogosService
  ) { }

  ngOnInit(): void {
    this.jogosService.carregarJogos();
    this.inputData.valueChanges.subscribe((val: string) => this.selecionarData(val));

    this.jogosService.carregouJogos.subscribe(() => {
      this.selecionarData('2021-01-16');
    });
  }

  selecionarData(dataIso: string) {
    this.dataSelecionada = dataIso ? this.dataService.converterDataIsoParaDate(dataIso) : undefined;
    this.jogo = this.jogosService.buscarJogoComDataIso(dataIso);
    console.log(this.jogo);
  }

}
