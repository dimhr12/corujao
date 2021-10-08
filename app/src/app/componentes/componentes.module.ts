import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { BreadcrumbsComponent } from "./breadcrumbs/breadcrumbs.component";


@NgModule({
    declarations: [
        BreadcrumbsComponent,
    ],
    exports: [
        BreadcrumbsComponent,
    ],
    imports: [RouterModule]
})
export class ComponentesModule { }
