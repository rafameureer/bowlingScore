import { Frame } from './frame';
import { TeenthFrame } from './teenthFrame';

describe('Frame', () => {
	let frame: Frame;
	beforeEach(() => {
		frame = new Frame();
	});
	it('Lançamento vazio', () => {
		frame.setFirstThrow(0, 0);
		expect(frame.firstThrow).toBe('-');
		expect(frame.totalPoints).toBe(0);
	});
	it('Lançamento vazio duplo', () => {
		frame.setFirstThrow(0, 0);
		frame.setSecondThrow(0);
		expect(frame.firstThrow).toBe('-');
		expect(frame.secondThrow).toBe('-');
		expect(frame.totalPoints).toBe(0);
	});
	it('Um strike', () => {
		frame.setFirstThrow(0, 10);
		expect(frame.firstThrow).toBe('X');
		expect(frame.totalPoints).toBe(10);
	});
	it('Um spire', () => {
		frame.setFirstThrow(0, 4);
		frame.setSecondThrow(6);
		expect(frame.firstThrow).toBe('4');
		expect(frame.secondThrow).toBe('/');
		expect(frame.totalPoints).toBe(10);
	});
	it('Um spire 0,10', () => {
		frame.setFirstThrow(0, 0);
		frame.setSecondThrow(10);
		expect(frame.firstThrow).toBe('-');
		expect(frame.secondThrow).toBe('/');
		expect(frame.totalPoints).toBe(10);
	});
	it('comum', () => {
		frame.setFirstThrow(0, 4);
		frame.setSecondThrow(3);
		expect(frame.firstThrow).toBe('4');
		expect(frame.secondThrow).toBe('3');
		expect(frame.totalPoints).toBe(7);
	});
	it('mais pinos', () => {
		frame.setFirstThrow(0, 6);
		frame.setSecondThrow(6);
		expect(frame.firstThrow).toBe('6');
		expect(frame.secondThrow).toBe('/');
		expect(frame.totalPoints).toBe(10);
	});

	describe('Apos um lançamento comum', () => {
		let firstFrame: Frame;
		beforeEach(() => {
			firstFrame = new Frame();
			firstFrame.setFirstThrow(0, 3);
			firstFrame.setSecondThrow(4);
			expect(firstFrame.totalPoints).toBe(7);
		});

		it('um lançamento com 5 pinos', () => {
			frame.setFirstThrow(firstFrame.totalPoints, 5);
			expect(frame.firstThrow).toBe('5');
			expect(frame.totalPoints).toBe(12);
		});
	});

	describe('Após spire', () => {
		let firstFrame: Frame;
		beforeEach(() => {
			firstFrame = new Frame();
			firstFrame.setFirstThrow(0, 4);
			firstFrame.setSecondThrow(6);
		});

		it('uma lançamento com dois pinos', () => {
			frame.setFirstThrow(firstFrame.totalPoints, 2);
			frame.verifyBonus(firstFrame);
			expect(frame.firstThrow).toBe('2');
			expect(frame.totalPoints).toBe(14);
		});

		it('dois lançamentos com 3,2 pinos', () => {
			frame.setFirstThrow(firstFrame.totalPoints, 3);
			frame.verifyBonus(firstFrame);
			expect(frame.firstThrow).toBe('3');
			expect(frame.totalPoints).toBe(16);
			frame.setSecondThrow(2);
			expect(frame.secondThrow).toBe('2');
			expect(frame.totalPoints).toBe(18);
		});
	});

	describe('Após strike', () => {
		let firstFrame: Frame;
		beforeEach(() => {
			firstFrame = new Frame();
			firstFrame.setFirstThrow(0, 10);
		});

		it('dois lançamento com dois pinos cada', () => {
			frame.setFirstThrow(firstFrame.totalPoints, 2);
			frame.verifyBonus(firstFrame);
			expect(frame.firstThrow).toBe('2');
			expect(frame.totalPoints).toBe(14);
			frame.setSecondThrow(2);
			frame.verifyBonus(firstFrame);
			expect(frame.secondThrow).toBe('2');
			expect(frame.totalPoints).toBe(18);
		});

		it('um lançamento com dois pinos', () => {
			frame.setFirstThrow(firstFrame.totalPoints, 2);
			frame.verifyBonus(firstFrame);

			expect(frame.firstThrow).toBe('2');
			expect(frame.totalPoints).toBe(14);
		});

		it('um strike', () => {
			frame.setFirstThrow(firstFrame.totalPoints, 10);
			frame.verifyBonus(firstFrame);
			expect(frame.firstThrow).toBe('X');
			expect(frame.totalPoints).toBe(30);
		});
	});

	describe('Após dois strikes', () => {
		let firstFrame: Frame;
		let secondFrame: Frame;
		beforeEach(() => {
			firstFrame = new Frame();
			firstFrame.setFirstThrow(0, 10);
			secondFrame = new Frame();
			secondFrame.setFirstThrow(firstFrame.totalPoints, 10);
			secondFrame.verifyBonus(firstFrame);
			expect(firstFrame.totalPoints).toBe(20);
		});
		it('um lançamento com 5 pinos', () => {
			frame.setFirstThrow(secondFrame.totalPoints, 5);
			frame.verifyBonus(secondFrame, firstFrame);
			expect(frame.firstThrow).toBe('5');
			expect(firstFrame.totalPoints).toBe(25);
			expect(secondFrame.totalPoints).toBe(40);
			expect(frame.totalPoints).toBe(45);
		});
		it('um lançamento com 7 pinos', () => {
			frame.setFirstThrow(secondFrame.totalPoints, 7);
			frame.verifyBonus(secondFrame, firstFrame);
			expect(frame.firstThrow).toBe('7');
			expect(frame.totalPoints).toBe(51);
		});
		it('dois lançamento com 5,3 pinos', () => {
			frame.setFirstThrow(secondFrame.totalPoints, 5);
			frame.verifyBonus(secondFrame, firstFrame);
			expect(frame.firstThrow).toBe('5');
			expect(frame.totalPoints).toBe(45);
			frame.setSecondThrow(3);
			frame.verifyBonus(secondFrame);
			expect(frame.secondThrow).toBe('3');
			expect(frame.totalPoints).toBe(51);
		});
		it('um stike', () => {
			frame.setFirstThrow(secondFrame.totalPoints, 10);
			frame.verifyBonus(secondFrame, firstFrame);
			expect(firstFrame.totalPoints).toBe(30);
			expect(secondFrame.totalPoints).toBe(50);
			expect(frame.firstThrow).toBe('X');
			expect(frame.totalPoints).toBe(60);
		});
	});
 describe('Após dois spare', () => {
		let firstFrame: Frame;
		let secondFrame: Frame;
		beforeEach(() => {
			firstFrame = new Frame();
			firstFrame.setFirstThrow(0, 4);
			firstFrame.setSecondThrow(6);
			secondFrame = new Frame();
			secondFrame.setFirstThrow(firstFrame.totalPoints, 5);
			secondFrame.setSecondThrow(5);
			secondFrame.verifyBonus(firstFrame);
		});
		it('um lançamento com 5 pinos', () => {
			expect(secondFrame.firstThrow).toBe('5');
			expect(secondFrame.secondThrow).toBe('/');
			expect(secondFrame.totalPoints).toBe(25);
			frame.setFirstThrow(secondFrame.totalPoints, 5);
			frame.verifyBonus(secondFrame);
			expect(frame.firstThrow).toBe('5');
			expect(frame.totalPoints).toBe(35);
		});
		it('um lançamento com 5,3 pinos', () => {
			expect(secondFrame.firstThrow).toBe('5');
			expect(secondFrame.secondThrow).toBe('/');
			expect(secondFrame.totalPoints).toBe(25);
			frame.setFirstThrow(secondFrame.totalPoints, 5);
			frame.verifyBonus(secondFrame);
			expect(frame.firstThrow).toBe('5');
			expect(frame.totalPoints).toBe(35);
			frame.setSecondThrow(3);
			expect(frame.secondThrow).toBe('3');
			expect(frame.totalPoints).toBe(38);
		});
		it('um spare', () => {
			expect(secondFrame.firstThrow).toBe('5');
			expect(secondFrame.secondThrow).toBe('/');
			expect(secondFrame.totalPoints).toBe(25);
			frame.setFirstThrow(secondFrame.totalPoints, 5);
			frame.verifyBonus(secondFrame);
			expect(frame.firstThrow).toBe('5');
			expect(frame.totalPoints).toBe(35);
			frame.setSecondThrow(5);
			expect(frame.secondThrow).toBe('/');
			expect(frame.totalPoints).toBe(40);
		});
	});

	describe('décimo frame', () => {
		it('3 lançamentos(strike, seguido de 2,5', () => {
			const previous = new Frame();
			previous.setFirstThrow(0, 0);
			const morePrevious = new Frame();
			morePrevious.setFirstThrow(0, 0);
			const tenthFrame = new TeenthFrame();
			tenthFrame.setFirstThrow(0, 10);
			expect(tenthFrame.firstThrow).toBe('X');
			expect(tenthFrame.totalPoints).toBe(10);
			tenthFrame.setSecondThrow(2);
			tenthFrame.verifyBonus(previous, morePrevious);
			expect(tenthFrame.secondThrow).toBe('2');
			expect(tenthFrame.totalPoints).toBe(12);
			tenthFrame.setThirdThrow(5);
			tenthFrame.verifyBonus(previous, morePrevious);
			expect(tenthFrame.thirdThrow).toBe('5');
			expect(tenthFrame.totalPoints).toBe(17);
		});

		it('3 lançamentos(6,4,5)', () => {
			const previous = new Frame();
			previous.setFirstThrow(0, 0);
			const morePrevious = new Frame();
			morePrevious.setFirstThrow(0, 0);
			const tenthFrame = new TeenthFrame();
			tenthFrame.setFirstThrow(0, 6);
			expect(tenthFrame.firstThrow).toBe('6');
			expect(tenthFrame.totalPoints).toBe(6);
			tenthFrame.setSecondThrow(4);
			tenthFrame.verifyBonus(previous, morePrevious);
			expect(tenthFrame.secondThrow).toBe('/');
			expect(tenthFrame.totalPoints).toBe(10);
			tenthFrame.setThirdThrow(5);
			tenthFrame.verifyBonus(previous, morePrevious);
			expect(tenthFrame.thirdThrow).toBe('5');
			expect(tenthFrame.totalPoints).toBe(15);
		});

		it('3 lançamentos(6,3)', () => {
			const previous = new Frame();
			previous.setFirstThrow(0, 0);
			const morePrevious = new Frame();
			morePrevious.setFirstThrow(0, 0);
			const tenthFrame = new TeenthFrame();
			tenthFrame.setFirstThrow(0, 6);
			expect(tenthFrame.firstThrow).toBe('6');
			expect(tenthFrame.totalPoints).toBe(6);
			tenthFrame.setSecondThrow(3);
			tenthFrame.verifyBonus(previous, morePrevious);
			expect(tenthFrame.secondThrow).toBe('3');
			expect(tenthFrame.totalPoints).toBe(9);
		});

		it('3 lançamentos(X,X,3)', () => {
			const previous = new Frame();
			previous.setFirstThrow(0, 0);
			const morePrevious = new Frame();
			morePrevious.setFirstThrow(0, 0);
			const tenthFrame = new TeenthFrame();
			tenthFrame.setFirstThrow(0, 10);
			expect(tenthFrame.firstThrow).toBe('X');
			expect(tenthFrame.totalPoints).toBe(10);
			tenthFrame.setSecondThrow(10);
			tenthFrame.verifyBonus(previous, morePrevious);
			expect(tenthFrame.secondThrow).toBe('X');
			expect(tenthFrame.totalPoints).toBe(20);
			tenthFrame.setThirdThrow(3);
			tenthFrame.verifyBonus(previous, morePrevious);
			expect(tenthFrame.thirdThrow).toBe('3');
			expect(tenthFrame.totalPoints).toBe(23);
		});
		let eighthFrame: Frame;
		let ninthFrame: Frame;
		it('Com decimo, nono e oitavo frame', () => {
			eighthFrame = new Frame();
			eighthFrame.setFirstThrow(0, 10);
			ninthFrame = new Frame();
			ninthFrame.setFirstThrow(eighthFrame.totalPoints, 10);
			ninthFrame.verifyBonus(eighthFrame);
			frame = new TeenthFrame();
			frame.setFirstThrow(ninthFrame.totalPoints, 5);
			expect(frame.firstThrow).toBe('5');
			frame.verifyBonus(ninthFrame, eighthFrame);
			frame.setSecondThrow(3);
			frame.verifyBonus(ninthFrame, eighthFrame);
			expect(eighthFrame.totalPoints).toBe(25);
			expect(ninthFrame.totalPoints).toBe(43);
			expect(frame.totalPoints).toBe(51);
		});
	});
});
