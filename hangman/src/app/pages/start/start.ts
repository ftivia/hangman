import { Component, output } from '@angular/core';

@Component({
  selector: 'app-start',
  imports: [],
  templateUrl: './start.html',
  styleUrl: './start.scss'
})
export class Start {
  navigate = output<void>();

  goToGame() {
    this.navigate.emit();
  }
}
