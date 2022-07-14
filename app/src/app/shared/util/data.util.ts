import { DiaDaSemanaEnum } from "../enums/dia-da-semana.enum";

export class DataUtil {

  public static readonly ANO_MINIMO = 2022;
  public static readonly ANO_ATUAL = new Date().getFullYear();
  public static readonly MES_ATUAL = new Date().getMonth()+1; // Usamos meses no range 1-12, o Date usa range 0-11
  // Horário local ignorando o timezone offset para formatação no padrão ISO
  public static readonly LOCAL_ISO_TIME = new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000);

  public static isSabado(data: Date = new Date()): boolean {
    return this.isDiaDaSemana(DiaDaSemanaEnum.Sabado, data)
  }
  public static isDiaDaSemana(dia: DiaDaSemanaEnum, data: Date = new Date()): boolean {
    return (data.getDay() == dia);
  }

  public static descontarOffsetFusoHorario(data: Date = new Date()): Date {
    return new Date(data.valueOf() - data.getTimezoneOffset() * 60000);
  }

  public static separarAnoMesDiaDataIso(dataIso: string): number[] {
    var splitted = dataIso.split('-');
    return [parseInt(splitted[0]), parseInt(splitted[1]), parseInt(splitted[2])];
  }

  public static obterMesDeDataIso(dataIso: string): number {
    return this.separarAnoMesDiaDataIso(dataIso)[1];
  }

  public static obterDiaDoMesDeDataIso(dataIso: string): number {
    return this.separarAnoMesDiaDataIso(dataIso)[2];
  }

  public static converterDataIsoParaDate(dataIso: string): Date {
    var splitted = this.separarAnoMesDiaDataIso(dataIso);
    return new Date(splitted[0], splitted[1]-1, splitted[2]);
  }

  public static obterDataUltimoSabado(data: Date = new Date()): Date {
    if (this.isSabado(data)) {
      return data;
    } else {
      const dataTemp = new Date(data.valueOf());
      dataTemp.setDate(dataTemp.getDate() - (dataTemp.getDay()+1));
      return dataTemp;
    }
  }

  public static formatarDataEmIso(data: Date = new Date()): string {
    return this.descontarOffsetFusoHorario(data).toISOString().split('T')[0];
  }

  public static getNomeMesLongo(mes: number): string {
    switch (mes) {
      case 1: return 'Janeiro';
      case 2: return 'Fevereiro';
      case 3: return 'Março';
      case 4: return 'Abril';
      case 5: return 'Maio';
      case 6: return 'Junho';
      case 7: return 'Julho';
      case 8: return 'Agosto';
      case 9: return 'Setembro';
      case 10: return 'Outubro';
      case 11: return 'Novembro';
      case 12: return 'Dezembro';
      default: return '';
    }
  }
  
  public static getNomeMesCurto(mes: number): string {
    switch (mes) {
      case 1: return 'Jan';
      case 2: return 'Fev';
      case 3: return 'Mar';
      case 4: return 'Abr';
      case 5: return 'Mai';
      case 6: return 'Jun';
      case 7: return 'Jul';
      case 8: return 'Ago';
      case 9: return 'Set';
      case 10: return 'Out';
      case 11: return 'Nov';
      case 12: return 'Dez';
      default: return '';
    }
  }
}
