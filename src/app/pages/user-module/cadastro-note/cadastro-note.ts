import { Component} from '@angular/core';
import { MockAuthService } from '../../../service/mock-auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-note',
  imports: [CommonModule, FormsModule, ReactiveFormsModule ],
  templateUrl: './cadastro-note.html',
  styleUrl: './cadastro-note.scss'
})
export class CadastroNote {
  cadastroNote: FormGroup;
  name: string;
  email: string ;
  password: string ;


  constructor( private fb:FormBuilder, cadastroNote: FormGroup) {

    this.name = "";
    this.email = "";
    this.password = "";

    this.cadastroNote = this.fb.group({
      name:["",[Validators.required]],
      email:["",[Validators.required]],
      password:["",[Validators.required]],
    })
    
  }

  async register(){

  }

 
 
}
