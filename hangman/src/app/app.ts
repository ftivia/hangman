import { Component, signal } from '@angular/core';
import { Game } from "./pages/game/game";
import { Instructions } from './pages/instructions/instructions';
import { Start } from "./pages/start/start";

@Component({
  selector: 'app-root',
  imports: [Game, Instructions, Start],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('hangman');

  readonly page = signal<'game' | 'instructions' | 'start'>('game');

  goTo(view: 'game' | 'instructions' | 'start'  ) {
    this.page.set(view);
  }
}
