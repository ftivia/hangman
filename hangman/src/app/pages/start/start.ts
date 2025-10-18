import { Component, computed, inject, output, signal } from '@angular/core';
import { GameService } from '../game/game.service';

@Component({
  selector: 'app-start',
  imports: [],
  templateUrl: './start.html',
  styleUrl: './start.scss'
})
export class Start {
  navigate = output<void>();
  selected = signal<number>(8);
  readonly gameService = inject(GameService);

  readonly availableLengths = computed(() => {
    const words = this.gameService.words();
    const lengths = new Set(words.map(w => w.length));
    return Array.from(lengths).sort((a, b) => a - b);
  });

  select(len: number) {
    this.selected.set(len);
  }

  isActive(len: number) {
    return this.selected() === len;
  }

  random() {
    const arr = this.availableLengths();
    if (arr.length === 0) return;
    const random = arr[Math.floor(Math.random() * arr.length)];
    this.select(random);
  }

  goToGame() {
    this.gameService.startGame(this.selected())
    this.navigate.emit();
  }
}
