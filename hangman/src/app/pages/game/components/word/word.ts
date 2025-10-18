import { Component, effect, inject, input, signal } from '@angular/core';
import { GameService } from '../../game.service';

@Component({
  selector: 'app-word',
  imports: [],
  templateUrl: './word.html',
  styleUrl: './word.scss'
})
export class Word {
  readonly game = inject(GameService);
}
