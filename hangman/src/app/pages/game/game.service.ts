import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GameService {
    readonly letters = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    readonly chosen = signal<Set<string>>(new Set());
    readonly error = signal<string | null>(null);

    readonly words = signal<string[]>([]);
    readonly selectedWord = signal<string | null>(null);
    readonly wordLetters = signal<string[]>([]);

    constructor() {
        this.loadWords();
    }

    private async loadWords() {
        const res = await fetch('words.txt');
        const text = await res.text();
        const list = text.split(/\r?\n/).map(w => w.trim().toUpperCase()).filter(Boolean);
        this.words.set(list);
    }

    startGame(letterCount: number) {
        const all = this.words();
        const filtered = all.filter(w => w.length === letterCount);
        if (filtered.length === 0) return;

        const chosen = filtered[Math.floor(Math.random() * filtered.length)];
        this.selectedWord.set(chosen);
        this.wordLetters.set(chosen.split(''));

        this.chosen.set(new Set());
        this.error.set(null);
    }

    chooseLetter(letter: string) {
        if (this.chosen().has(letter)) return;

        const selected = this.selectedWord();
        if (!selected) return;

        const isCorrect = selected.includes(letter);
        this.chosen.update(s => new Set([...s, letter]));
        this.error.set(isCorrect ? null : letter);
    }

    isChosen(letter: string) {
        return this.chosen().has(letter);
    }

    reset() {
        this.chosen.set(new Set());
        this.error.set(null);
        this.selectedWord.set(null);
        this.wordLetters.set([]);
    }

    endGame() {
        const word = this.selectedWord();
        if (!word) return;
        this.chosen.set(new Set(word.split('')));
    }
}
