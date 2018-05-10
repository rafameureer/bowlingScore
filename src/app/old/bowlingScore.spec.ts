import { BowlingScore } from './bowlingScore';

describe('Placar de Boliche', () => {
	let score: BowlingScore = null;
	beforeEach(() => {
		score = new BowlingScore();
	});

	for (let index = 1; index < 10; index++) {
		it('Tudo vazio ' + index, () => {
			expect(score.frames[index].firstThrow).toBe('');
			expect(score.frames[index].secondThrow).toBe('');
		});
	}
	it('Tudo vazio 10', () => {
		expect(score.frames[10].firstThrow).toBe('');
		expect(score.frames[10].secondThrow).toBe('');
		expect(score.frames[10].thirdThrow).toBe('');
	});

	describe('Frame #1', () => {
		it('um lançamento com 3 pinos derrubados', () => {
			score.throwAndPointing(3);
			expect(score.frames[1].firstThrow).toBe('3');
			expect(score.totalPoints).toBe(3);
		});

		it('um lançamento com 0 pinos derrubados', () => {
			score.throwAndPointing(0);
			expect(score.frames[1].firstThrow).toBe('-');
			expect(score.totalPoints).toBe(0);
		});

		it('um lançamento com 10 pinos derrubados', () => {
			score.throwAndPointing(10);
			expect(score.frames[1].firstThrow).toBe('X');
			expect(score.totalPoints).toBe(10);
		});

		it('dois lançamentos um com 4 e o outro com 3 pinos derrubados', () => {
			score.throwAndPointing(4);
			expect(score.frames[1].firstThrow).toBe('4');
			score.throwAndPointing(3);
			expect(score.frames[1].secondThrow).toBe('3');
			expect(score.totalPoints).toBe(7);
		});

		it('dois lançamentos um com 0 e o outro com 10 pinos derrubados', () => {
			score.throwAndPointing(0);
			expect(score.frames[1].firstThrow).toBe('-');
			score.throwAndPointing(10);
			expect(score.frames[1].secondThrow).toBe('/');
			expect(score.totalPoints).toBe(10);
		});

		it('um lançamento com 2 pinos depois de lançar 1,9', () => {
			score.throwAndPointing(1);
			score.throwAndPointing(9);
			expect(score.frames[1].secondThrow).toBe('/');
			expect(score.frames[1].totalPoints).toBe(10);
			expect(score.totalPoints).toBe(10);
		});

		it('dois lançamentos ambos com 0 pinos derrubados', () => {
			score.throwAndPointing(0);
			score.throwAndPointing(0);
			expect(score.frames[1].firstThrow).toBe('-');
			expect(score.frames[1].secondThrow).toBe('-');
			expect(score.totalPoints).toBe(0);
		});
	});

	describe('Frame #2', () => {
		it('um lançamento com 3 pinos depois de dois com 0', () => {
			score.throwAndPointing(0);
			expect(score.frames[1].firstThrow).toBe('-');
			score.throwAndPointing(0);
			expect(score.frames[1].secondThrow).toBe('-');
			score.throwAndPointing(3);
			expect(score.frames[2].firstThrow).toBe('3');
			expect(score.totalPoints).toBe(3);
		});

		it('um lançamento com 5 pinos depois de lançar 3,4', () => {
			score.throwAndPointing(3);
			score.throwAndPointing(4);
			score.throwAndPointing(5);
			expect(score.frames[2].firstThrow).toBe('5');
			expect(score.frames[2].totalPoints).toBe(12);
			expect(score.totalPoints).toBe(12);
		});

		it('um lançamento com 2 pinos depois de lançar 1,9', () => {
			score.throwAndPointing(1);
			score.throwAndPointing(9);
			expect(score.frames[1].secondThrow).toBe('/');
			score.throwAndPointing(2);
			expect(score.frames[2].firstThrow).toBe('2');
			expect(score.frames[1].totalPoints).toBe(12);
			expect(score.totalPoints).toBe(14);
		});

		it('um lançamento com 2 pinos depois de um strike', () => {
			score.throwAndPointing(10);
			expect(score.frames[1].firstThrow).toBe('X');
			score.throwAndPointing(2);
			expect(score.frames[2].firstThrow).toBe('2');
			expect(score.frames[1].totalPoints).toBe(12);
			expect(score.totalPoints).toBe(14);
		});

		it('um lançamento com 2,4 pinos depois de um  strike', () => {
			score.throwAndPointing(10);
			expect(score.frames[1].firstThrow).toBe('X');
			score.throwAndPointing(2);
			expect(score.frames[2].firstThrow).toBe('2');
			expect(score.frames[1].totalPoints).toBe(12);
			expect(score.totalPoints).toBe(14);
			score.throwAndPointing(4);
			expect(score.frames[2].secondThrow).toBe('4');
			expect(score.frames[1].totalPoints).toBe(16);
			expect(score.totalPoints).toBe(22);
		});
	});

	describe('Frame #3', () => {
		it('um lançamento com 5 pinos depois de lançar 3,4 e 4,2', () => {
			score.throwAndPointing(2);
			score.throwAndPointing(4);
			score.throwAndPointing(4);
			score.throwAndPointing(3);
			score.throwAndPointing(5);
			expect(score.frames[3].firstThrow).toBe('5');
			expect(score.frames[1].totalPoints).toBe(6);
			expect(score.frames[2].totalPoints).toBe(13);
			expect(score.frames[3].totalPoints).toBe(18);
			expect(score.totalPoints).toBe(18);
		});

		it('um lançamento com 5 pinos pinos depois de 2 strikes', () => {
			score.throwAndPointing(10);
			expect(score.frames[1].firstThrow).toBe('X');
			score.throwAndPointing(10);
			expect(score.frames[2].firstThrow).toBe('X');
			expect(score.frames[1].totalPoints).toBe(20);
			expect(score.totalPoints).toBe(30);
			score.throwAndPointing(5);
			expect(score.frames[3].firstThrow).toBe('5');
			expect(score.frames[1].totalPoints).toBe(25);
			expect(score.frames[2].totalPoints).toBe(40);
			expect(score.frames[3].totalPoints).toBe(45);
			expect(score.totalPoints).toBe(45);
		});

		it('um lançamento com 2 pinos depois de lançar square no segundo e 2,4 no primeiro', () => {
			score.throwAndPointing(2);
			expect(score.frames[1].firstThrow).toBe('2');
			score.throwAndPointing(4);
			expect(score.frames[1].secondThrow).toBe('4');
			score.throwAndPointing(1);
			expect(score.frames[2].firstThrow).toBe('1');
			score.throwAndPointing(9);
			expect(score.frames[2].secondThrow).toBe('/');
			score.throwAndPointing(2);
			expect(score.frames[3].firstThrow).toBe('2');
			expect(score.frames[2].totalPoints).toBe(18);
			expect(score.totalPoints).toBe(20);
		});
	});
	describe('um jogo perfeito', () => {
		it('10 strikes', () => {
			for (let i = 0; i < 12; i++) {
				score.throwAndPointing(10);
			}
			for (let i = 0; i < 8; i++) {
				expect(score.frames[i + 1].firstThrow).toBe('X');
			}
			expect(score.frames[10].firstThrow).toBe('X');
			expect(score.frames[10].secondThrow).toBe('X');
			expect(score.frames[10].thirdThrow).toBe('X');
			expect(score.frames[10].totalPoints).toBe(300);
			expect(score.totalPoints).toBe(300);
		});
	});
});
