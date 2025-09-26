import { Component} from '@angular/core';
import { MockAuthService } from '../../../service/mock-auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro-note',
  imports: [CommonModule, FormsModule, ],
  templateUrl: './cadastro-note.html',
  styleUrl: './cadastro-note.scss'
})
export class CadastroNote {
  name: string = '';
  email: string = '';
  password: string = '';
  message: string = '';

  constructor(private authService: MockAuthService, private router: Router) {}

  async register() {
    if (this.name && this.email && this.password.length >= 8) {
      const success = this.authService.register(this.name, this.email, this.password);
      if (success) {
        this.message = 'Cadastro realizado com sucesso!';
        this.router.navigateByUrl('/login');
      } else {
        this.message = 'E-mail já cadastrado.';
      }
    } else {
      this.message = 'Preencha todos os campos corretamente.';
    }
  }
}
