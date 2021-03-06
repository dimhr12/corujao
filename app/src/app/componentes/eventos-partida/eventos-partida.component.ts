import { Component, Input } from '@angular/core';

import { environment } from '../../../environments/environment';
import { TimeEnum } from '../../shared/enums/time.enum';
import { TipoEventoJogoEnum } from '../../shared/enums/tipo-evento-jogo.enum';
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
  public baseUrl = environment.baseurl;

  @Input() jogo: Jogo;
  @Input() mostrarEscalacao: boolean = true;

  public jogadores: Record<string, Jogador> = {};

  constructor(
    private jogadoresService: JogadoresService,
  ) {
    this.jogadoresService.buscarJogadores().subscribe(jogadores => {
      jogadores.forEach(j => {
        this.jogadores[j.id] = j;
      });
    });
  }

  public isEventoTimeBranco(evento: EventoJogo): boolean {
    return evento.time == TimeEnum.BRANCO;
  }

  public isEventoTimeVerde(evento: EventoJogo): boolean {
    return evento.time == TimeEnum.VERDE;
  }

  public isGol(evento: EventoJogo): boolean {
    return evento.tipo == TipoEventoJogoEnum.GOL;
  }
  public isGolContra(evento: EventoJogo): boolean {
    return evento.tipo == TipoEventoJogoEnum.GOL_CONTRA;
  }

  public getEventosTimeBranco(): EventoJogo[] {
    return this.jogo.eventos?.filter(x => x.time == TimeEnum.BRANCO) ?? [];
  }

  public getEventosTimeVerde(): EventoJogo[] {
    return this.jogo.eventos?.filter(x => x.time == TimeEnum.VERDE) ?? [];
  }

  public getNomeJogador(idJogador: string): string {
    return idJogador in this.jogadores ? this.jogadores[idJogador].nome : idJogador;
  }
  public getNomeCompletoJogador(idJogador: string): string | undefined {
    return idJogador in this.jogadores ? this.jogadores[idJogador].nome_completo : undefined;
  }

}
