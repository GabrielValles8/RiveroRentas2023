import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoFiltroComponent } from './resultado-filtro.component';

describe('ResultadoFiltroComponent', () => {
  let component: ResultadoFiltroComponent;
  let fixture: ComponentFixture<ResultadoFiltroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultadoFiltroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadoFiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
