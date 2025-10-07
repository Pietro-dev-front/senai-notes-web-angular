import { Component } from '@angular/core';

@Component({
  selector: 'app-all-notes',
  standalone: true,
  imports: [],
  templateUrl: './all-notes.component.html',
  styleUrls: ['./all-notes.component.scss']
})
export class AllNotesComponent {
  darkMode: boolean = false;
  imageUrl: string | null = null;

  ligarDesligarDarkMode() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle("dark-mode", this.darkMode);
    localStorage.setItem("darkMode", this.darkMode.toString());
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.imageUrl = URL.createObjectURL(file);
    }
  }
}
