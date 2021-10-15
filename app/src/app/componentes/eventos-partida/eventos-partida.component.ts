import { Component, Input } from '@angular/core';
import { TimeEnum } from 'src/app/shared/enums/time.enum';

import { EventoJogo } from '../../shared/modelos/evento-jogo';
import { Jogador } from '../../shared/modelos/jogador';

@Component({
  selector: 'corujao-eventos-partida',
  templateUrl: './eventos-partida.component.html',
  styleUrls: ['./eventos-partida.component.scss']
})
export class EventosPartidaComponent {

    @Input() eventos: EventoJogo[];

    public jogadores: Jogador[];

    public isEventoTimeBranco(evento: EventoJogo) {
        return evento.time == TimeEnum.BRANCO;
    }
}
