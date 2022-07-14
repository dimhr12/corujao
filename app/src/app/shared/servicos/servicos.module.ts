import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { JogadoresService } from './jogadores.service';
import { ModelosModule } from '../modelos/modelos.module';
import { JogosService } from './jogos.service';

@NgModule({
  imports: [ CommonModule, HttpClientModule, ModelosModule ],
  declarations: [],
  providers: [
    JogadoresService,
    JogosService,
  ],
})
export class ServicosModule { }
