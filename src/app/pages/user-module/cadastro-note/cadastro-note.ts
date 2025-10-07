import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-note',
  imports: [CommonModule, ReactiveFormsModule ],
  templateUrl: './cadastro-note.html',
  styleUrls: ['./cadastro-note.scss']
})
export class CadastroNote {
  cadastroNote: FormGroup;
  nameErrorMessage!:string;
  emailErrorMessage!: string;
  passwordErrorMessage!: string;
  sucessLogin!: string;
  incorrectCredentials!: string;
  newPasswordErrorMessage!: string;
  darkMode: boolean = false


  constructor( private fb:FormBuilder) {


    this.cadastroNote = this.fb.group({
      name:["",[Validators.required]],
      email:["",[Validators.required]],
      password:["",[Validators.required]],
    })
  }

  async register(){
    this.emailErrorMessage = "";
    this.passwordErrorMessage = "";
    this.sucessLogin = "";
    this.incorrectCredentials = "";
    this.nameErrorMessage = "";
    this.newPasswordErrorMessage = "";

    if (this.cadastroNote.value.name == "") {
      this.nameErrorMessage = "O campo de nome e obrigatorio.";
      return
    }

    if (this.cadastroNote.value.email == "") {
      this.emailErrorMessage = "O campo de e-mail e obrigatorio.";
      return
    }

    if (this.cadastroNote.value.password == "") {
      this.passwordErrorMessage = "O campo de senha e obrigatorio.";
    }else if(this.cadastroNote.value.password.length <= 6) {
      this.passwordErrorMessage = "O campo de senha tem que ser maior que 6 caracter";
    }
     console.log("cheguei aqui ",this.cadastroNote.value.password.length)

     console.log("Email", this.cadastroNote.value.email)
    console.log("Password", this.cadastroNote.value.password)

    let token: string | null = null;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem("meuToken");
    }
    console.log("cheguei", token)

    let response = await fetch("https://senai-gpt-api.azurewebsites.net/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        name: this.cadastroNote.value.name,
        email: this.cadastroNote.value.email,
        password: this.cadastroNote.value.password,
      }),
    });

    if (response.status >= 200 && response.status <= 299) {
      this.sucessLogin = "Logado com sucesso.";
      let json = await response.json();
      console.log("JSON", json)
      if (typeof window !== 'undefined') {
        window.location.href = "login";
      }
    } else {
      this.incorrectCredentials = "Credenciais incorretas";
    }
  }
  ligarDesligarDarkMode() {

    this.darkMode = !this.darkMode; // o inverso do this.darkmode .

    if (typeof document !== 'undefined' && document.body) {
      document.body.classList.toggle("dark-mode", this.darkMode);
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem("darkMode", this.darkMode.toString());
    }
  }

}
