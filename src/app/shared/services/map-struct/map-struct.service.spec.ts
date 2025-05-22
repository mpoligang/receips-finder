import { TestBed } from '@angular/core/testing';

import { MapStructService } from './map-struct.service';

describe('MapStructService', () => {
  let service: MapStructService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapStructService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
