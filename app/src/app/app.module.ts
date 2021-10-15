import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { JogadoresComponent } from './jogadores/jogadores.component';
import { ResultadosComponent } from './resultados/resultados.component';
import { RankingComponent } from './ranking/ranking.component';
import { ComponentesModule } from './componentes/componentes.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    JogadoresComponent,
    ResultadosComponent,
    RankingComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule,
    ComponentesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
