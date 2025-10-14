import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class NotesService {
  // Endpoint público de anotações
  private apiUrl = 'http://senai-gpt-api.azurewebsites.net/senainotes/notasg1';

  constructor(private http: HttpClient) {}

  // Método GET para buscar as notas
  getNotes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Método PUT para salvar a nota após edição
  saveNote(note: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${note.id}`, note);
  }

  // Método POST para criar uma nova nota
  createNote(note: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, note);
  }

  deleteNote(id: number): Observable<any> {
  return this.http.delete<any>(`${this.apiUrl}/${id}`);
}
}
