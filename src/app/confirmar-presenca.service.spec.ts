import { TestBed } from '@angular/core/testing';

import { ConfirmarPresencaService } from './confirmar-presenca.service';

describe('ConfirmarPresencaService', () => {
  let service: ConfirmarPresencaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmarPresencaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
