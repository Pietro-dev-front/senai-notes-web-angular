import { Routes } from '@angular/router';
import { LoginNote } from './pages/user-module/login-note/login-note';
import { CadastroNote } from './pages/user-module/cadastro-note/cadastro-note';
import { AllNotesComponent } from './pages/user-module/all-notes/all-notes.component';



export const routes: Routes = [
    {
        path:"",
        loadComponent:() => LoginNote
    },
    {
        path:"login",
        loadComponent: () => LoginNote
    },
    {
        path:"cadastro",
        loadComponent:() => CadastroNote
    },
    {
        path:"notas",
        loadComponent:() => AllNotesComponent
    }
];
