import { AppPage } from './app.po';

describe('bowling-score App', () => {
	let page: AppPage;

	beforeEach(() => {
		page = new AppPage();
	});

	it('Mostrar o titulo', () => {
		page.navigateTo();
		expect(page.getParagraphText()).toEqual('Placar de Boliche');
	});

	it('Mostrar o h3', () => {
		page.navigateTo();
		expect(page.geth3Text()).toEqual('Pinos Derrubados:');
	});

	it('input', () => {
		page.navigateTo();
		const input = page.getInput();
		page.setInput(input, '4');
		expect(input.getAttribute('value')).toBe('4');
	});

	it('enviar zero(-)', () => {
		page.navigateTo();
		const button = page.saveButton();
		page.clickButton(button);
		expect(page.firstThrow(0)).toEqual('-');
	});

	it('enviar um lançamento com 5 pinos', () => {
		page.navigateTo();
		const input = page.getInput();
		page.setInput(input, '5');
		const button = page.saveButton();
		page.clickButton(button);
		expect(page.firstThrow(0)).toEqual('5');
	});

	it('enviar um lançamento com strike', () => {
		page.navigateTo();
		const input = page.getInput();
		page.setInput(input, '10');
		const button = page.saveButton();
		page.clickButton(button);
		expect(page.firstThrow(0)).toEqual('X');
	});

	it('enviar dois lançamentos um com 5 e outro com 4 pontos', () => {
		page.navigateTo();
		const input = page.getInput();
		const button = page.saveButton();
		page.setInput(input, '5');
		page.clickButton(button);
		page.setInput(input, '4');
		page.clickButton(button);
		expect(page.firstThrow(0)).toEqual('5');
		expect(page.secondThrow(0)).toEqual('4');
		expect(page.totalPoints(0)).toEqual('9');
	});

	it('enviar dois lançamentos um com 0 e outro com 10', () => {
		page.navigateTo();
		const input = page.getInput();
		const button = page.saveButton();
		page.setInput(input, '0');
		page.clickButton(button);
		page.setInput(input, '10');
		page.clickButton(button);
		expect(page.firstThrow(0)).toEqual('-');
		expect(page.secondThrow(0)).toEqual('/');
		expect(page.totalPoints(0)).toEqual('10');
	});

	it('enviar dois lançamentos um com 3 e outro com 7', () => {
		page.navigateTo();
		const input = page.getInput();
		const button = page.saveButton();
		page.setInput(input, '3');
		page.clickButton(button);
		page.setInput(input, '7');
		page.clickButton(button);
		expect(page.firstThrow(0)).toEqual('3');
		expect(page.secondThrow(0)).toEqual('/');
		expect(page.totalPoints(0)).toEqual('10');
	});

	it('enviar 3 lançamentos 3,2,5', () => {
		page.navigateTo();
		const input = page.getInput();
		const button = page.saveButton();
		page.setInput(input, '3');
		page.clickButton(button);
		page.setInput(input, '2');
		page.clickButton(button);
		page.setInput(input, '5');
		page.clickButton(button);
		expect(page.firstThrow(0)).toEqual('3');
		expect(page.secondThrow(0)).toEqual('2');
		expect(page.totalPoints(0)).toEqual('5');
		expect(page.firstThrow(1)).toEqual('5');
		expect(page.totalPoints(1)).toEqual('10');
	});

	it('enviar 3 lançamentos 3,7,5', () => {
		page.navigateTo();
		const input = page.getInput();
		const button = page.saveButton();
		page.setInput(input, '3');
		page.clickButton(button);
		page.setInput(input, '7');
		page.clickButton(button);
		page.setInput(input, '5');
		page.clickButton(button);
		expect(page.firstThrow(0)).toEqual('3');
		expect(page.secondThrow(0)).toEqual('/');
		expect(page.totalPoints(0)).toEqual('15');
		expect(page.firstThrow(1)).toEqual('5');
		expect(page.totalPoints(1)).toEqual('20');
	});

	it('enviar 2 lançamentos 10,7', () => {
		page.navigateTo();
		const input = page.getInput();
		const button = page.saveButton();
		page.setInput(input, '10');
		page.clickButton(button);
		page.setInput(input, '7');
		page.clickButton(button);
		expect(page.firstThrow(0)).toEqual('X');
		expect(page.totalPoints(0)).toEqual('17');
		expect(page.firstThrow(1)).toEqual('7');
		expect(page.totalPoints(1)).toEqual('24');
	});

	it('enviar 3 lançamentos 10,7,1', () => {
		page.navigateTo();
		const input = page.getInput();
		const button = page.saveButton();
		page.setInput(input, '10');
		page.clickButton(button);
		page.setInput(input, '7');
		page.clickButton(button);
		page.setInput(input, '1');
		page.clickButton(button);
		expect(page.firstThrow(0)).toEqual('X');
		expect(page.totalPoints(0)).toEqual('18');
		expect(page.firstThrow(1)).toEqual('7');
		expect(page.secondThrow(1)).toEqual('1');
		expect(page.totalPoints(1)).toEqual('26');
	});

	it('Jogo perfeito', () => {
		page.navigateTo();
		const input = page.getInput();
		const button = page.saveButton();
		let count = 0;
		while (count <= 11) {
			page.setInput(input, '10');
			page.clickButton(button);
			count ++;

		}
		count = 0;
		while (count <= 9) {
			expect(page.firstThrow(count)).toEqual('X');
			count++;
		}
		expect(page.secondThrow(9)).toEqual('X');
		expect(page.thirdThrow()).toEqual('X');
		expect(page.totalPoints(0)).toEqual('30');
		expect(page.totalPoints(1)).toEqual('60');
		expect(page.totalPoints(2)).toEqual('90');
		expect(page.totalPoints(3)).toEqual('120');
		expect(page.totalPoints(4)).toEqual('150');
		expect(page.totalPoints(5)).toEqual('180');
		expect(page.totalPoints(6)).toEqual('210');
		expect(page.totalPoints(7)).toEqual('240');
		expect(page.totalPoints(8)).toEqual('270');
		expect(page.totalPoints(9)).toEqual('300');
	});

});

// describe('Frame', () => {
//   beforeEach(() => {
//     page.navigateTo();
//   });
//   it('esperando que setNumber seja 3', () => {
//     expect(page.getFrame()).toEqual(3);
//   });
//   it('Vazio', () => {
//     expect(page.getFrameEmpty()).toEqual('-');
//   });
// });
