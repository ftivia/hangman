import { Component, effect, inject, input, output, signal } from '@angular/core';
import { GameService } from '../../game.service';

@Component({
  selector: 'app-letters',
  imports: [],
  templateUrl: './letters.html',
  styleUrl: './letters.scss'
})
export class Letters {
  readonly gameService = inject(GameService);

  choose(letter: string) {
    if (this.gameService.isChosen(letter)) return;
    this.gameService.chooseLetter(letter);
  }

  isChoosed(letter: string) {
    return this.gameService.chosen().has(letter);
  }

}
