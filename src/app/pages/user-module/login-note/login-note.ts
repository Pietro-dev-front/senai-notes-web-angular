import { ChangeDetectorRef, Component } from '@angular/core';
import { MockAuthService } from '../../../service/mock-auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-note',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login-note.html',
  styleUrl: './login-note.scss'
})
export class LoginNote {

  emailErrorMessage: string;
  passwordErrorMessage: string;
  sucessLogin: string;
  incorrectCredentials: string;
  loginNote: FormGroup;
  darkMode: boolean = false

  constructor(private fb: FormBuilder,private cd: ChangeDetectorRef) {
    this.loginNote = this.fb.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required]],

    });

    this.emailErrorMessage = "";
    this.passwordErrorMessage = "";
    this.sucessLogin = "";
    this.incorrectCredentials = "";
  }

  async login() {
    this.emailErrorMessage = "";
    this.passwordErrorMessage = "";
    this.sucessLogin = "";
    this.incorrectCredentials = "";

    if (this.loginNote.value.email == "") {
      this.emailErrorMessage = "O campo de e-mail e obrigatorio.";
      return
    }

    if (this.loginNote.value.password == "") {
      this.passwordErrorMessage = "O campo de senha e obrigatorio.";
      return
    }

    console.log("Email", this.loginNote.value.email)
    console.log("Password", this.loginNote.value.password)

    let response = await fetch("https://senai-gpt-api.azurewebsites.net/login",{
       method: "POST",
       headers:{
         "Content-Type": "application/json"
       },
       body: JSON.stringify({
         email: this.loginNote.value.email,
         password: this.loginNote.value.password
       })
     });

    if (response.status === 200 && response.status <= 299) {
      this.sucessLogin = "Logado com sucesso.";
      let json = await response.json();
      console.log("JSON", json)
      let meuToken = json.accessToken;
      let userId = json.user.id;
      localStorage.setItem("meuToken", meuToken);
      localStorage.setItem("meuId",userId);
      window.location.href = "notas"
    } else {
      this.incorrectCredentials = "Credenciais incorretas";
    }
    this.cd.detectChanges();
  }
 
  ligarDesligarDarkMode() {

    this.darkMode = !this.darkMode; // o inverso do this.darkmode .

    document.body.classList.toggle("dark-mode", this.darkMode);
    
    localStorage.setItem("darkMode", this.darkMode.toString());
  }


}



