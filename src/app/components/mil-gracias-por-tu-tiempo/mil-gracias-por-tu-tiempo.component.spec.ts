import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MilGraciasPorTuTiempoComponent } from './mil-gracias-por-tu-tiempo.component';

describe('MilGraciasPorTuTiempoComponent', () => {
  let component: MilGraciasPorTuTiempoComponent;
  let fixture: ComponentFixture<MilGraciasPorTuTiempoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MilGraciasPorTuTiempoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MilGraciasPorTuTiempoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
