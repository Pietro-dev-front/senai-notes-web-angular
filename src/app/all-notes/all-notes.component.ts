import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

interface INotes {
  id: number;
  titulo: string;
  descricao?: string;
  imagemUrl?: string;
  data?: string;
  tags?: string[];
}

@Component({
  selector: 'app-all-notes',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './all-notes.component.html',
  styleUrls: ['./all-notes.component.scss']
})
export class AllNotesComponent implements OnInit {
  darkMode: boolean = false;
  notes: INotes[] = [];
  noteSelecionado: INotes | null = null;
  tagSelecionada: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // SSR/prerender: só executa código do browser se window estiver disponível
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      if (saved) {
        this.darkMode = saved === 'true';
        if (typeof document !== 'undefined' && document.body) {
          document.body.classList.toggle('dark-mode', this.darkMode);
        }
      }
      // carrega notas apenas no browser
      this.loadNotes();
    }
    // Se estiver rodando no SSR/prerender, não faz nada que dependa do browser
  }

  ligarDesligarDarkMode() {
    this.darkMode = !this.darkMode;
    if (typeof document !== 'undefined' && document.body) {
      document.body.classList.toggle('dark-mode', this.darkMode);
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('darkMode', this.darkMode.toString());
    }
  }

  loadNotes(): void {
    this.http.get<{ notes: INotes[] }>('/assets/database.json').subscribe({
      next: (res) => {
        this.notes = res?.notes ?? [];
        // se tiver notas, seleciona a primeira por padrão
        if (this.notes.length > 0) {
          this.noteSelecionado = this.notes[0];
        }
      },
      error: (err) => {
        console.error('Erro ao carregar database.json:', err);
      }
    });
  }

  createNote(): void {
    const novo: INotes = {
      id: Date.now(),
      titulo: 'Nova nota',
      descricao: '',
      imagemUrl: 'assets/imagens/Rectangle 45.png',
      data: new Date().toISOString().split('T')[0],
      tags: []
    };
    // adiciona no topo da lista e seleciona
    this.notes.unshift(novo);
    this.noteSelecionado = novo;
  }

  selectNote(note: INotes): void {
    this.noteSelecionado = note;
  }

}

