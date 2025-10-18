import { Component, inject, output, signal } from '@angular/core';
import { GameService } from '../game/game.service';

@Component({
  selector: 'app-start',
  imports: [],
  templateUrl: './start.html',
  styleUrl: './start.scss'
})
export class Start {
  navigate = output<void>();
  selected = signal<number>(8)

  readonly gameService = inject(GameService);

  goToGame() {
    this.gameService.startGame(this.selected())
    this.navigate.emit();
  }
}
