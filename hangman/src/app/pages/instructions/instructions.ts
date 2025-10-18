import { Component, output } from '@angular/core';

@Component({
  selector: 'app-instructions',
  imports: [],
  templateUrl: './instructions.html',
  styleUrl: './instructions.scss'
})
export class Instructions {
  navigate = output<void>();

  goToStart() {
    this.navigate.emit();
  }
}
