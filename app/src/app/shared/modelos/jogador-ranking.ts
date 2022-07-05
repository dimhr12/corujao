import { Jogador } from './jogador';

export class JogadorRanking extends Jogador {
    public gols: number;
    public pontos: number;
    public assiduidade: number;

    constructor(obj?: object) {
        super();
        Object.assign(this, obj);
    }
};
