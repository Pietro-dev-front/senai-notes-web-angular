import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroNote } from './cadastro-note';

describe('CadastroNote', () => {
  let component: CadastroNote;
  let fixture: ComponentFixture<CadastroNote>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroNote]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroNote);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
