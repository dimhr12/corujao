import { TimeEnum } from "../enums/time.enum";
import { TipoEventoJogo } from "../enums/tipo-evento-jogo.enum";

export class EventoJogo {
    public tipo: TipoEventoJogo;
    public time: TimeEnum;
    public jogador: string;
};
