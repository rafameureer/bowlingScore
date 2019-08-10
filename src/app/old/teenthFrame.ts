import { Frame } from './frame';

export class TeenthFrame extends Frame {
	public throwNumber = 0;
	public thirdThrow: string;
	public thirdThrowPinsKnocked: number;

	constructor() {
		super();
	}

	public setFirstThrow(totalPoints: number, pinsKnocked: number) {
		super.setFirstThrow(totalPoints, pinsKnocked);
		if (totalPoints !== undefined && pinsKnocked !== undefined) { this.throwNumber++; }
	}

	public setSecondThrow(pinsKnocked: number) {
		this.throwNumber++;
		super.setSecondThrow(pinsKnocked);
	}

	public setThirdThrow(pinsKnocked: number): void {
		this.throwNumber++;
		this.thirdThrowPinsKnocked = pinsKnocked;
		this.thirdThrow = pinsKnocked.toString();
		this.verifyFrame();
	}

	protected verifyFrame(): void {
		super.verifyFrame();
		if (this.throwNumber === 3) { this.totalPoints -= this.secondThrowPinsKnocked; }
		if (this.thirdThrowPinsKnocked > 0) {
			this.totalPoints += this.thirdThrowPinsKnocked;
		}
	}

	public verifyBonus(previous: Frame, morePrevious?: Frame) {
		if (this.throwNumber === 1) {
			super.verifyBonus(previous, morePrevious);
		} else if (this.throwNumber === 2) {
			if (this.firstThrow === 'X') {
				if (this.firstThrowPinsKnocked !== 10 && this.firstThrowPinsKnocked + this.secondThrowPinsKnocked === 10) {
					this.secondThrow = '/';
				}
				if (this.secondThrowPinsKnocked === 10) { this.secondThrow = 'X'; }
			}
			super.verifyBonus(previous);
		} else {
			if (this.secondThrowPinsKnocked !== 10 && this.secondThrowPinsKnocked + this.thirdThrowPinsKnocked === 10) {
				this.thirdThrow = '/';
			}
			if (this.thirdThrowPinsKnocked === 10) { this.thirdThrow = 'X'; }
		}
	}
}
