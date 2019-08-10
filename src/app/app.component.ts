import { Component } from '@angular/core';
import { BowlingScore } from './old/bowlingScore';
import { Frame } from './old/frame';
import { TeenthFrame } from './old/teenthFrame';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less']
})
export class AppComponent {
	public pins: string;
	public score: BowlingScore;

	constructor() {
		this.score = new BowlingScore();
		this.pins = '';
	}

	public throwPins() {
		try {
			const pinsKnocked: number = +this.pins;
			if (!pinsKnocked && pinsKnocked !== 0) {
				throw new Error('Favor digitar o número de pinos derrubados');
			} else if (pinsKnocked < 0 || pinsKnocked > 10) {
				throw new Error('Existem apenas 10 pinos. Favor digitar o número de pinos derrubados');
			} else if (this.score.frame === 10 && this.score.throwNumber > 3) {
				throw new Error('A partida acabou');
			}
			this.score.throwAndPointing(pinsKnocked);
		} catch (e) {
			alert(e.message);
		} finally {
			this.pins = '';
		}
	}

	public reset() {
		console.log('reset');
		this.score = new BowlingScore();
		this.pins = '';
	}

	public isTeenth(f: Frame) {
		return f instanceof TeenthFrame;
	}

	public getColSpan(f: Frame): string {
		return f instanceof TeenthFrame ? '3' : '2';
	}
}
