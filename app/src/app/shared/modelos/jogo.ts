import { TimeEnum } from "../enums/time.enum";
import { TipoEventoJogoEnum } from "../enums/tipo-evento-jogo.enum";
import { EventoJogo } from "./evento-jogo";

export class Jogo {
    public data: string;
    public mensagem: string;
    public jogadores_branco: string[];
    public jogadores_verde: string[];
    public eventos: EventoJogo[];

    public _golsBranco?: number = undefined;
    public _golsVerde?: number = undefined;

    public get golsBranco(): number {
        if (typeof this._golsBranco == 'undefined') this.carregarGols();
        return <number>this._golsBranco;
    }
    public get golsVerde() {
        if (typeof this._golsVerde == 'undefined') this.carregarGols();
        return <number>this._golsVerde;
    }

    constructor(obj?: object) {
        if (obj) {
            Object.assign(this, obj);
        }
    }

    private carregarGols(): void {
        if (!this.eventos) {
            return;
        }
        this._golsBranco = 0;
        this._golsVerde = 0;
        for (let evt = 0; evt < this.eventos.length; evt++) {
            let x = this.eventos[evt];
            if (x.tipo == TipoEventoJogoEnum.GOL || x.tipo == TipoEventoJogoEnum.GOL_CONTRA) {
                if (x.time == TimeEnum.BRANCO) {
                    (<number>this._golsBranco)++;
                } else if (x.time == TimeEnum.VERDE) {
                    (<number>this._golsVerde)++;
                } else {
                    console.error("Time desconhecido: " + x.time);
                }
            }
        }
    }
};
