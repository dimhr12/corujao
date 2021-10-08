import { Component, Input } from '@angular/core';

@Component({
  selector: 'corujao-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent {

  @Input() paginaAtual: string = '';

}
