import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviaTuReservaComponent } from './envia-tu-reserva.component';

describe('EnviaTuReservaComponent', () => {
  let component: EnviaTuReservaComponent;
  let fixture: ComponentFixture<EnviaTuReservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnviaTuReservaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnviaTuReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
