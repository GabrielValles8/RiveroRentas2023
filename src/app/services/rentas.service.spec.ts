import { TestBed } from '@angular/core/testing';

import { RentasService } from './rentas.service';

describe('RentasService', () => {
  let service: RentasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RentasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
