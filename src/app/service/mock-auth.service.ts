import { Injectable } from '@angular/core';

export interface UserMock {
  name: string;
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class MockAuthService {
  private users: UserMock[] = [];
  private loggedInUser: UserMock | null = null;

  constructor() {
    if (this.isBrowser()) {
      const saved = localStorage.getItem('mockUsers');
      if (saved) {
        this.users = JSON.parse(saved);
      } else {
        this.users = [{
          name: 'Usuário Teste',
          email: 'teste@teste.com',
          password: '12345678'
        }];
        localStorage.setItem('mockUsers', JSON.stringify(this.users));
      }
    } else {
      this.users = [{
        name: 'Usuário Teste',
        email: 'teste@teste.com',
        password: '12345678'
      }];
    }
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  private saveUsers() {
    if (this.isBrowser()) {
      localStorage.setItem('mockUsers', JSON.stringify(this.users));
    }
  }

  register(name: string, email: string, password: string): boolean {
    if (this.users.find(u => u.email === email)) {
      return false;
    }
    this.users.push({ name, email, password });
    this.saveUsers();
    return true;
  }

  login(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.loggedInUser = user;
      return true;
    }
    return false;
  }

  getLoggedInUser(): UserMock | null {
    return this.loggedInUser;
  }

  logout(): void {
    this.loggedInUser = null;
  }
}
