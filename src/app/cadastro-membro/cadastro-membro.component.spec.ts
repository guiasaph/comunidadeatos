import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroMembroComponent } from './cadastro-membro.component';

describe('CadastroMembroComponent', () => {
  let component: CadastroMembroComponent;
  let fixture: ComponentFixture<CadastroMembroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroMembroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroMembroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
