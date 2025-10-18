import { Component, signal, ViewChild } from '@angular/core';
import { Svg } from './svg/svg';

@Component({
  selector: 'app-root',
  imports: [Svg],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('hangman');

  nextStep = signal(0);
  resetTick = signal(0);

  @ViewChild(Svg) svg?: Svg;

  next() {
    if (this.svg?.canNext()) {
      this.nextStep.update(v => v + 1);
    }
  }

  reset() {
    this.resetTick.update(v => v + 1);
  }

  get canNext() {
    return this.svg?.canNext() ?? false;
  }
}
