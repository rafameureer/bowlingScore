import { Frame } from './frame';
import { TeenthFrame } from './teenthFrame';
export class BowlingScore {
	public frames: Frame[] = [];
	public Auxpins: string;
	public throwNumber = 1;
	public totalPoints = 0;
	public frame = 1;

	constructor() {
		for (let index = 1; index < 10; index++) {
			this.frames[index] = new Frame();
			this.frames[index].setNumber(index);
		}
		this.frames[10] = new TeenthFrame();
		this.frames[10].setNumber(10);
	}

	public getFrames() {
		const validFrames: Frame[] = [];
		this.frames.forEach(frame => {
			if (frame) { validFrames.push(frame); }
		});
		return validFrames;
	}

	public throwAndPointing(pins: number): string {
		if (this.throwNumber === 1) {
			this.frames[this.frame].setFirstThrow(this.totalPoints, pins);
		} else if (this.throwNumber === 2) {
			this.frames[this.frame].setSecondThrow(pins);
		} else {
			(this.frames[this.frame] as TeenthFrame).setThirdThrow(pins);
		}
		if (this.frame > 2) {
			this.frames[this.frame].verifyBonus(this.frames[this.frame - 1], this.frames[this.frame - 2]);
		} else if (this.frame > 1) {
			this.frames[this.frame].verifyBonus(this.frames[this.frame - 1]);
		}
		const result = (this.throwNumber === 1) ? this.frames[this.frame].firstThrow : this.frames[this.frame].secondThrow;
		this.totalPoints = this.frames[this.frame].totalPoints;

		if ((this.frames[this.frame].isStrike() || this.throwNumber === 2) && this.frame !== 10) {
			this.frame++;
			this.throwNumber = 0;
		}
		this.throwNumber++;
		return result;
	}
}
