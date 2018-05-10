import { TestBed, async } from '@angular/core/testing';
import { NgForm, NgModel } from '@angular/forms';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
	TestBed.configureTestingModule({
		declarations: [
		AppComponent
		],
	}).compileComponents();
  }));

  xit('should create the app', async(() => {
	const fixture = TestBed.createComponent(AppComponent);
	const app = fixture.debugElement.componentInstance;
	expect(app).toBeTruthy();
  }));

  xit(`should have as title 'app'`, async(() => {
	const fixture = TestBed.createComponent(AppComponent);
	const app = fixture.debugElement.componentInstance;
	expect(app.title).toEqual('app');
  }));
});
