import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NotesService } from '../../../notes.service';


interface Note {
  id: number;
  title: string;
  content: string;
  tags: string[];
  date: string;
  newNote: string;
}

@Component({
  selector: 'app-all-notes',
  templateUrl: './all-notes.component.html',
  styleUrl: './all-notes.component.scss',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
})

export class AllNotesComponent implements OnInit {
  notes: any[] = [];
  selectedNote: any = null;
  tagSelecionada: string = ''
  tituloNota = new FormControl("");
  descricaoNota = new FormControl("");
  arquivoImagem: File | null = null;  // mantém o arquivo selecionado
  urlImagem = '';                     // URL local para preview
  darkMode: boolean = false;
  availableTags = ['Dev', 'Cooking', 'Work', 'Home', 'Travel'];


  constructor(private notesService:NotesService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getNotes();
  }


  // Método para buscar as notas
  getNotes(): void {
    this.notesService.getNotes().subscribe((data: any[]) => {
      this.notes = data;
      this.cd.detectChanges();
      console.log(this.notes);
    });
  }

  // Método para salvar uma nota
  onNoteSave(): void {
  if (this.selectedNote) {
    this.notesService.saveNote(this.selectedNote).subscribe(() => {
  this.getNotes();
});
    this.selectedNote.titulo = this.tituloNota.value || '';
    this.selectedNote.descricao = this.descricaoNota.value || '';
    this.selectedNote.imagemUrl = this.urlImagem; // 👈 garante envio da imagem

    this.notesService.saveNote(this.selectedNote).subscribe(() => {
      this.getNotes();
      this.selectedNote = this.notes.find(n => n.id === this.selectedNote.id);
    });
  }
}


  // Método para selecionar uma nota
  onNoteClick(note: any): void {
    this.selectedNote = note;
    this.tituloNota.setValue(this.selectedNote.titulo);
    this.descricaoNota.setValue(this.selectedNote.descricao);

    if (this.selectedNote.tags != null && this.selectedNote.tags.length > 0) {

      this.tagSelecionada = this.selectedNote.tags[0];

    } else {

      this.tagSelecionada = "";

    }
  }

  // Método para criar uma nova nota
  onNoteCreate(): void {
    const newNote = {
      titulo: 'Novo Titulo',
      descricao: 'Descrição da nova nota',
      imagemUrl: 'link da imagem',
      usuarioId: 1,
      tags: ['Tag 1'],
      dataCriacao: new Date().toISOString(),
      dataAtualizacao: new Date().toISOString(),
    };

    this.notesService.createNote(newNote).subscribe(() => {
      this.getNotes();  // Atualiza a lista de notas
      this.tituloNota.reset('');
      this.descricaoNota.reset('');
      this.tagSelecionada = '';
      this.urlImagem = '';
      this.selectedNote = null;
    });

  }


  // Método para excluir uma nota
 onNoteDelete(): void {
  // Se nenhuma nota está selecionada, pega a primeira da lista
  if (!this.selectedNote) {
    if (this.notes.length === 0) {
      alert('Não há notas para excluir.');
      return;
    }
    this.selectedNote = this.notes[0]; // seleciona a primeira nota
  }

  const confirmDelete = confirm(`Tem certeza que deseja excluir a nota "${this.selectedNote.titulo}"?`);
  if (confirmDelete) {
    this.notesService.deleteNote(this.selectedNote.id).subscribe(() => {
      // Remove da lista localmente
      this.notes = this.notes.filter(n => n.id !== this.selectedNote.id);
      this.selectedNote = null;
      this.tituloNota.reset('');
      this.descricaoNota.reset('');
      this.tagSelecionada = '';
      this.urlImagem = '';
    });
  }
}


  definirImagem(evento: Event): void {
  const input = evento.target as HTMLInputElement;
  if (!input.files?.length) return;

  const file = input.files[0];
  const reader = new FileReader();

  reader.onload = () => {
    this.urlImagem = reader.result as string; // base64 string
    if (this.selectedNote) {
      this.selectedNote.imagemUrl = this.urlImagem; // salva na nota atual
    }
    if (this.selectedNote) {
    this.selectedNote.imagemUrl = this.urlImagem;
    }
  };

  reader.readAsDataURL(file);
}
toggleTag(tag: string): void {
  if (!this.selectedNote) return;

  if (!this.selectedNote.tags) {
    this.selectedNote.tags = [];
  }

  const index = this.selectedNote.tags.indexOf(tag);

  if (index > -1) {
    // Se já existe, remove
    this.selectedNote.tags.splice(index, 1);
  } else {
    // Se não existe, adiciona
    this.selectedNote.tags.push(tag);
  }
}




  ligarDesligarDarkMode() {

    this.darkMode = !this.darkMode;

    document.body.classList.toggle("dark-mode", this.darkMode);

    localStorage.setItem("darkMode", this.darkMode.toString())


  }


}
