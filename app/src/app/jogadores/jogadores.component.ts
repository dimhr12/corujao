import { Component, OnInit } from '@angular/core';
import { JogadoresService } from '../shared/servicos/jogadores.service';

@Component({
  selector: 'app-jogadores',
  templateUrl: './jogadores.component.html',
  styleUrls: ['./jogadores.component.scss']
})
export class JogadoresComponent implements OnInit {

  public jogadores$ = this.jogadoresService.buscarJogadores();

  constructor(
    private jogadoresService: JogadoresService,
  ) { }

  ngOnInit(): void {
  }

}
