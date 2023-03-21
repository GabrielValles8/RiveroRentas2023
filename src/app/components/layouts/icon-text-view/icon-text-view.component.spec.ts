import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconTextViewComponent } from './icon-text-view.component';

describe('IconTextViewComponent', () => {
  let component: IconTextViewComponent;
  let fixture: ComponentFixture<IconTextViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconTextViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconTextViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
