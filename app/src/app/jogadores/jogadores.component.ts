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
  public todosJogadores: Jogador[]=[];
  public jogadores: Jogador[]=[];

  constructor(
    private jogadoresService: JogadoresService,
  ) { }

  ngOnInit(): void { // carrega todos os jogadores do json?
    this.jogadoresService.buscarJogadores().subscribe((dados)=>{
      this.todosJogadores=dados;
      this.jogadores=this.todosJogadores;
    });
  }

  listaTodosJogadores() { // cria lista com todos os jogadores
    var TodosJogadores=[];
    for (var i=0; i < this.jogadores.length; i++){
      TodosJogadores.push(this.jogadores[i])
      }
    return TodosJogadores;
  }

  showAll() {  // retorna todos os jogadores
    this.jogadores = this.todosJogadores;
  }

  filtrarPosicao(pos: string) { // filtra os jogadores pela posição selecionada no botão
    var jogadoresFiltrados=[];

    for (var i=0; i < this.todosJogadores.length; i++){
      if (this.todosJogadores[i].posicao.includes(pos)) {
        jogadoresFiltrados.push(this.todosJogadores[i])
      }
    }
    this.jogadores = jogadoresFiltrados;
  }
}
