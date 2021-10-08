import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JogadoresComponent } from './jogadores.component';

describe('JogadoresComponent', () => {
  let component: JogadoresComponent;
  let fixture: ComponentFixture<JogadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JogadoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JogadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
