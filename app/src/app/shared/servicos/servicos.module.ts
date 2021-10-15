import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { JogadoresService } from './jogadores.service';
import { ModelosModule } from '../modelos/modelos.module';
import { JogosService } from './jogos.service';
import { DataService } from './data.service';

@NgModule({
  imports: [ CommonModule, HttpClientModule, ModelosModule ],
  declarations: [],
  providers: [
    DataService,
    JogadoresService,
    JogosService,
  ],
})
export class ServicosModule { }
