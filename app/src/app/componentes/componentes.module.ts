import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { EventosPartidaComponent } from './eventos-partida/eventos-partida.component';


@NgModule({
    declarations: [
        BreadcrumbsComponent,
        EventosPartidaComponent,
    ],
    exports: [
        BreadcrumbsComponent,
        EventosPartidaComponent,
    ],
    imports: [
        RouterModule,
        BrowserModule,
    ]
})
export class ComponentesModule { }
