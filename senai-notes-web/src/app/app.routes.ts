import { Routes } from '@angular/router';
import { LoginNote } from './pages/user-module/login-note/login-note';
import { CadastroNote } from './pages/user-module/cadastro-note/cadastro-note';

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
];
