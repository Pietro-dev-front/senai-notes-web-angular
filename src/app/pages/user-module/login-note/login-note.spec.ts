import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginNote } from './login-note';

describe('LoginNote', () => {
  let component: LoginNote;
  let fixture: ComponentFixture<LoginNote>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginNote]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginNote);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
