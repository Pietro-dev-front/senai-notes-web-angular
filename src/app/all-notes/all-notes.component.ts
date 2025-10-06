import { Component } from '@angular/core';

@Component({
  selector: 'app-all-notes',
  imports: [],
  templateUrl: './all-notes.component.html',
  styleUrl: './all-notes.component.scss'
})
export class AllNotesComponent {
  darkMode: boolean = false
  
  ligarDesligarDarkMode() {

    this.darkMode = !this.darkMode; // o inverso do this.darkmode .
  
    document.body.classList.toggle("dark-mode", this.darkMode);
    
    localStorage.setItem("darkMode", this.darkMode.toString());
  }

}

