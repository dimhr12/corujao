import { Component, OnInit } from '@angular/core';
import { Jogador } from '../shared/modelos/jogador';
import { JogadoresService } from '../shared/servicos/jogadores.service';

@Component({
  selector: 'app-jogadores',
  templateUrl: './jogadores.component.html',
  styleUrls: ['./jogadores.component.scss']
})
export class JogadoresComponent implements OnInit {
  public jogadores: Jogador[]=[]; 
  constructor(
    private jogadoresService: JogadoresService,
  ) { }

  ngOnInit(): void {
    this.jogadoresService.buscarJogadores().subscribe((dados)=>{
      this.jogadores=dados;
    });
  }

  filtrarPosicao(pos: string) {
    var jogadoresFiltrados=[];

   // this.jogadores.filter(function(currentValue, index, arr), thisValue)

    for (var i=0; i < this.jogadores.length; i++){
      if (this.jogadores[i].posicao.includes(pos)) {
        jogadoresFiltrados.push(this.jogadores[i])
      }
    }
    return jogadoresFiltrados;
  }
}
