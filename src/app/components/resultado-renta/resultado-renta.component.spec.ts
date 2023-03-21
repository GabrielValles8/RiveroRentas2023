import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoRentaComponent } from './resultado-renta.component';

describe('ResultadoRentaComponent', () => {
  let component: ResultadoRentaComponent;
  let fixture: ComponentFixture<ResultadoRentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultadoRentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadoRentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
