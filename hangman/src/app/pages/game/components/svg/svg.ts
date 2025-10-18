import { Component, computed, effect, input, signal } from '@angular/core';

type SvgStep = 
  | { type: 'path'; d: string }
  | { type: 'circle'; cx: number; cy: number; r: number };

@Component({
  selector: 'app-svg',
  imports: [],
  templateUrl: './svg.html',
  styleUrl: './svg.scss'
})
export class Svg {
  next = input(0);
  reset = input(0);

  private readonly steps: readonly SvgStep[] = [
    { type: 'path', d: 'M1,11 h8' },
    { type: 'path', d: 'M9,11 v-10' },
    { type: 'path', d: 'M9,1 h-4' },
    { type: 'path', d: 'M5,1 v2' },
    { type: 'circle', cx: 5, cy: 4, r: 1 },
    { type: 'path', d: 'M5,5 v3' },
    { type: 'path', d: 'M5,5 l-2,2' },
    { type: 'path', d: 'M5,5 l2,2' },
    { type: 'path', d: 'M5,8 l-2,2' },
    { type: 'path', d: 'M5,8 l2,2' },
  ];

  private visibleCount = signal(0);
  visibleSteps = computed(() => this.steps.slice(0, this.visibleCount()));
  canNext = computed(() => this.visibleCount() < this.steps.length);

  private onNext = effect(() => {
    this.next();
    if (this.canNext()) this.visibleCount.update(v => v + 1);
  });

  private onReset = effect(() => {
    this.reset();
    this.visibleCount.set(0);
  });
}
