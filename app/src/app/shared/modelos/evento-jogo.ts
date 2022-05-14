import { TimeEnum } from "../enums/time.enum";
import { TipoEventoJogoEnum } from "../enums/tipo-evento-jogo.enum";

export class EventoJogo {
    public tipo: TipoEventoJogoEnum;
    public time: TimeEnum;
    public jogador: string;
};
