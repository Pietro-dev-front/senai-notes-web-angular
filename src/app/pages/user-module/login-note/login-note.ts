import { Component } from '@angular/core';
import { MockAuthService } from '../../../service/mock-auth.service';

@Component({
  selector: 'app-login-note',
  imports: [],
  templateUrl: './login-note.html',
  styleUrl: './login-note.scss'
})
export class LoginNote {
  email: string = '';
  password: string = '';
  message: string = '';

  constructor(private authService: MockAuthService) {}

  async login() {
    if (this.email && this.password) {
      const success = this.authService.login(this.email, this.password);
      if (success) {
        this.message = 'Login realizado com sucesso!';
      } else {
        this.message = 'E-mail ou senha inválidos.';
      }
    } else {
      this.message = 'Preencha todos os campos.';
    }
  }
}
