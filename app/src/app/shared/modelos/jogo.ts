import { TimeEnum } from "../enums/time.enum";
import { TipoEventoJogo } from "../enums/tipo-evento-jogo.enum";
import { EventoJogo } from "./evento-jogo";

export class Jogo {
    public data: string;
    public jogadores_branco: string[];
    public jogadores_verde: string[];
    public eventos: EventoJogo[];

    public _golsBranco?: number = undefined;
    public _golsVerde?: number = undefined;

    public get golsBranco(): number {
        if (typeof this._golsBranco == 'undefined') this.carregarGols();
        console.log("golsBranco: " + this._golsBranco);
        return <number>this._golsBranco;
    }
    public get golsVerde() {
        if (typeof this._golsVerde == 'undefined') this.carregarGols();
        console.log("golsVerde: " + this._golsVerde);
        return <number>this._golsVerde;
    }

    constructor(obj?: object) {
        if (obj) {
            Object.assign(this, obj);
        }
    }

    private carregarGols(): void {
        this._golsBranco = 0;
        this._golsVerde = 0;
        for (let evt = 0; evt < this.eventos.length; evt++) {
            let x = this.eventos[evt];
            console.log("x.tipo: " + x.tipo + " == " + TipoEventoJogo.GOL);
            if (x.tipo == TipoEventoJogo.GOL) {
                console.log("x.time: " + x.time + " == " + TimeEnum.BRANCO);
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
