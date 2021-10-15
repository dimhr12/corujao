import { Injectable } from '@angular/core';

@Injectable()
export class DataService {

  constructor() { }

  obterDiaDoMesDeDataIso(dataIso: string): number {
    var splitted = dataIso.split('-');
    return parseInt(splitted[2]);
  }

  separarAnoMesDiaDataIso(dataIso: string): number[] {
    var splitted = dataIso.split('-');
    return [parseInt(splitted[0]), parseInt(splitted[1]), parseInt(splitted[2])];
  }

  converterDataIsoParaDate(dataIso: string) {
    var splitted = this.separarAnoMesDiaDataIso(dataIso);
    return new Date(splitted[0], splitted[1]-1, splitted[2]);
  }

}
