import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuestrasUnidadesComponent } from './nuestras-unidades.component';

describe('NuestrasUnidadesComponent', () => {
  let component: NuestrasUnidadesComponent;
  let fixture: ComponentFixture<NuestrasUnidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuestrasUnidadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuestrasUnidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
