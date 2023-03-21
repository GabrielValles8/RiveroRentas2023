import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromocionesParaRentarAutosComponent } from './promociones-para-rentar-autos.component';

describe('PromocionesParaRentarAutosComponent', () => {
  let component: PromocionesParaRentarAutosComponent;
  let fixture: ComponentFixture<PromocionesParaRentarAutosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromocionesParaRentarAutosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromocionesParaRentarAutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
