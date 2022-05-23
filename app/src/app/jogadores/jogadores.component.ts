import { Component, OnInit } from '@angular/core';
import { Jogador } from '../shared/modelos/jogador';
import { JogadoresService } from '../shared/servicos/jogadores.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-jogadores',
  templateUrl: './jogadores.component.html',
  styleUrls: ['./jogadores.component.scss']
})
export class JogadoresComponent implements OnInit {
  public baseUrl = environment.baseurl;
  public jogadores: Jogador[]=[]; 
  constructor(
    private jogadoresService: JogadoresService,
  ) { }

  ngOnInit(): void { // carrega todos os jogadores do json?
    this.jogadoresService.buscarJogadores().subscribe((dados)=>{
      this.jogadores=dados;
    });
  }

  listaTodosJogadores() { // cria lista com todos os jogadores
    var TodosJogadores=[];
    for (var i=0; i < this.jogadores.length; i++){
      TodosJogadores.push(this.jogadores[i])
      }
      return TodosJogadores;
  }

  filtrarPosicao(pos: string) { // filtra os jogadores pela posição selecionada no botão
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
