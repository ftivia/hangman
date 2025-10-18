import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'app-letters',
  imports: [],
  templateUrl: './letters.html',
  styleUrl: './letters.scss'
})
export class Letters {
  readonly letters = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
  readonly chosen = signal<Set<string>>(new Set());
  readonly selected = output<string>();

  choose(letter: string) {
    if (this.chosen().has(letter)) return;
    this.chosen.update(s => new Set([...s, letter]));
    this.selected.emit(letter);
  }

  isChoosed(letter: string) {
    return this.chosen().has(letter);
  }
}
