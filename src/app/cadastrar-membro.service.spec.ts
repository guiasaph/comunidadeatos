import { TestBed } from '@angular/core/testing';

import { CadastrarMembroService } from './cadastrar-membro.service';

describe('CadastrarMembroService', () => {
  let service: CadastrarMembroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadastrarMembroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
