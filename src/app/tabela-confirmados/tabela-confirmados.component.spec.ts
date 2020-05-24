import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaConfirmadosComponent } from './tabela-confirmados.component';

describe('TabelaConfirmadosComponent', () => {
  let component: TabelaConfirmadosComponent;
  let fixture: ComponentFixture<TabelaConfirmadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabelaConfirmadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaConfirmadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
