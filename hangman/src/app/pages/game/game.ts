import { Component, output, signal, ViewChild } from '@angular/core';
import { Svg } from '../../svg/svg';

@Component({
  selector: 'app-game',
  imports: [Svg],
  templateUrl: './game.html',
  styleUrl: './game.scss'
})
export class Game {
  nextStep = signal(0);
  resetStep = signal(0);
  navigate = output<void>();

  @ViewChild(Svg) svg?: Svg;

  next() {
    if (this.svg?.canNext()) {
      this.nextStep.update(v => v + 1);
    }
  }

  reset() {
    this.resetStep.update(v => v + 1);
  }

  goToInstructions() {
    this.navigate.emit();
  }
}
