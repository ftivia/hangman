import { Component, signal, ViewChild } from '@angular/core';
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
  @ViewChild(Game) game?: Game;

  readonly page = signal<'game' | 'instructions' | 'start'>('start');
  readonly start = signal(false);

  goTo(view: 'game' | 'instructions' | 'start') {
    this.page.set(view);

    if (view === 'game') {
      this.start.set(true);
    }
  }
}
