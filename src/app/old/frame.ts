export class Frame {
	public firstThrowPinsKnocked: number;
	public secondThrowPinsKnocked: number;
	public firstThrow = '';
	public secondThrow = '';
	private _isSpire = false;
	private _isStrike = false;
	public thirdThrow = '';
	public thirdThrowPinsKnocked: number;
	public number: number;
	public totalPoints = 0;

	public setNumber(number: number): void {
		this.number = number;
	}

	public isSpire(): boolean {
		return this._isSpire;
	}
	public isStrike(): boolean {
		return this._isStrike;
	}

	protected verifyFrame(): void {
		if (!this.secondThrow) { this.totalPoints += this.firstThrowPinsKnocked; }
		this.totalPoints += this.secondThrow ? this.secondThrowPinsKnocked : 0;

		if (this.firstThrowPinsKnocked === 10) {
			this._isStrike = true;
			this.firstThrow = 'X';

		} else if ((this.firstThrowPinsKnocked + this.secondThrowPinsKnocked >= 10)) {
			this._isSpire = true;
			this.secondThrow = '/';
			if (this.firstThrowPinsKnocked + this.secondThrowPinsKnocked > 10) {
				this.totalPoints -= this.firstThrowPinsKnocked;
				this.totalPoints -= this.secondThrowPinsKnocked;
				this.totalPoints += 10;
			}
		} else {
			if (this.firstThrowPinsKnocked === 0) {
				this.firstThrow = '-';
				this.firstThrowPinsKnocked = 0;
			}
			if (this.secondThrowPinsKnocked === 0) { this.secondThrow = '-'; }
		}
	}

	public verifyBonus(previous: Frame, morePrevious?: Frame): void {
		if (morePrevious && morePrevious.isStrike()) {
			if (this.firstThrow !== 'X') {
				previous.totalPoints -= morePrevious.totalPoints;
				morePrevious.totalPoints += this.firstThrowPinsKnocked;
				previous.totalPoints += morePrevious.totalPoints;
				previous.totalPoints += this.firstThrowPinsKnocked;
				this.totalPoints = previous.totalPoints + this.firstThrowPinsKnocked;
			} else {
				previous.totalPoints -= morePrevious.totalPoints;
				morePrevious.totalPoints += 10;
				previous.totalPoints += morePrevious.totalPoints;
				previous.totalPoints += 10;
				this.totalPoints = previous.totalPoints + 10;
			}
		} else if (previous.isStrike() || previous.isSpire()) {
			if (this.firstThrow !== 'X' && this.secondThrow !== '/') {
				previous.totalPoints += this.firstThrowPinsKnocked;
				this.totalPoints += this.firstThrowPinsKnocked;
				if (this.secondThrow) {
					previous.totalPoints += this.secondThrowPinsKnocked - this.firstThrowPinsKnocked;
					this.totalPoints += this.secondThrowPinsKnocked - this.firstThrowPinsKnocked;
				}
			} else if (this.secondThrow === '/') {
				previous.totalPoints += this.firstThrowPinsKnocked;
				this.totalPoints += this.firstThrowPinsKnocked;
				if (this.secondThrow) {
					previous.totalPoints += this.secondThrowPinsKnocked - this.firstThrowPinsKnocked;
					this.totalPoints += this.secondThrowPinsKnocked - this.firstThrowPinsKnocked;
				}
			} else {
				previous.totalPoints += 10;
				this.totalPoints += 10;
			}
		}
	}

	constructor() { }

	public setFirstThrow(totalPoints: number, pinsKnocked: number) {
		this.totalPoints = totalPoints;
		this.firstThrowPinsKnocked = pinsKnocked;
		this.firstThrow = pinsKnocked.toString();
		this.verifyFrame();
	}

	public setSecondThrow(pinsKnocked: number): void {
		this.secondThrowPinsKnocked = pinsKnocked;
		this.secondThrow = pinsKnocked.toString();
		this.verifyFrame();
	}
}
