import { Component, effect, inject, input, output, signal, ViewChild } from '@angular/core';
import { Svg } from './components/svg/svg';
import { Word } from './components/word/word';
import { Letters } from './components/letters/letters';
import { GameService } from './game.service';

@Component({
  selector: 'app-game',
  imports: [Svg, Word, Letters],
  templateUrl: './game.html',
  styleUrl: './game.scss'
})
export class Game {
  readonly start = input<boolean>(false);
  readonly nextStep = signal(0);
  readonly resetStep = signal(0);
  readonly navigate = output<void>();

  readonly gameService = inject(GameService);

  @ViewChild(Svg) svg?: Svg;

  constructor() {
    effect(() => {
      if (this.start()) {
        this.startGame();
      }
    });
    effect(() => {
      if (this.gameService.error()) {
        this.nextSvg();
      }
    });
  }

  startGame() {
    this.resetSvg();
  }

  endGame() {
    this.gameService.endGame();
    this.resetSvg();
  }

  nextSvg() {
    if (this.svg?.canNext()) {
      this.nextStep.update(v => v + 1);
    }
  }

  resetSvg() {
    this.resetStep.update(v => v + 1);
  }

  goToInstructions() {
    this.navigate.emit();
  }
}
