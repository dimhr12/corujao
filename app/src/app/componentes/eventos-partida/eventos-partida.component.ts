import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { TimeEnum } from '../../shared/enums/time.enum';
import { TipoEventoJogo } from '../../shared/enums/tipo-evento-jogo.enum';
import { EventoJogo } from '../../shared/modelos/evento-jogo';
import { Jogador } from '../../shared/modelos/jogador';
import { Jogo } from '../../shared/modelos/jogo';
import { JogadoresService } from '../../shared/servicos/jogadores.service';

@Component({
  selector: 'corujao-eventos-partida',
  templateUrl: './eventos-partida.component.html',
  styleUrls: ['./eventos-partida.component.scss']
})
export class EventosPartidaComponent {

  @Input() jogo: Jogo;

  public jogadores$: Observable<Jogador[]>;
  public jogadores: Jogador[];

  constructor(
    private jogadoresService: JogadoresService,
  ) {
    this.jogadores$ = this.jogadoresService.buscarJogadores();
  }

  public isEventoTimeBranco(evento: EventoJogo): boolean {
    return evento.time == TimeEnum.BRANCO;
  }

  public isGol(evento: EventoJogo): boolean {
    return evento.tipo == TipoEventoJogo.GOL;
  }

}
