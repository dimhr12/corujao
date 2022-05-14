
export enum PosicaoJogadorEnum {
    GOL = 'GOL',
    ZAG = 'ZAG',
    LAT = 'LAT',
    MEC = 'MEC',
    ATA = 'ATA',
};

export const PosicaoJogadorNome = new Map<PosicaoJogadorEnum, string>([
    [PosicaoJogadorEnum.GOL, 'Goleiro'],
    [PosicaoJogadorEnum.ZAG, 'Zagueiro'],
    [PosicaoJogadorEnum.LAT, 'Lateral'],
    [PosicaoJogadorEnum.MEC, 'Meio-campo'],
    [PosicaoJogadorEnum.ATA, 'Atacante'],
]);
