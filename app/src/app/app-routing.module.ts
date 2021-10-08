import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { JogadoresComponent } from './jogadores/jogadores.component';
import { RankingComponent } from './ranking/ranking.component';
import { ResultadosComponent } from './resultados/resultados.component';

const routes: Routes = [
  {
    path: '',
    component: InicioComponent,
  },
  {
    path: 'jogadores',
    component: JogadoresComponent,
  },
  {
    path: 'ranking',
    component: RankingComponent,
  },
  {
    path: 'resultados',
    component: ResultadosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
