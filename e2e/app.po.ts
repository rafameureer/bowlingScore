import { browser, by, element, ElementArrayFinder, ElementFinder } from 'protractor';
import { Frame } from '../src/app/old/frame';
import { DebugElement } from '@angular/core/src/debug/debug_node';
import { ComponentFixture } from '@angular/core/testing';
import { BowlingScore } from '../src/app/old/bowlingScore';
import { async, TestBed, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule, BaseRequestOptions, XHRBackend, ResponseOptions, Response, ResponseType } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient, HttpHandler } from '@angular/common/http';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';
import { By } from '@angular/platform-browser/src/dom/debug/by';


export class AppPage {
	component: BowlingScore;
	fixture: ComponentFixture<BowlingScore>;
	nameDisplay: HTMLElement;
	nameInput: HTMLInputElement;
	buttons: ElementArrayFinder;
	navigateTo() {
		return browser.get('/');
	}

	getParagraphText() {
		return element(by.css('app-root h1')).getText();
	}

	geth3Text() {
		return element(by.css('app-root h3')).getText();
	}

	getInput(): ElementFinder {
		return element(by.css('app-root input'));
	}

	saveButton(): ElementFinder {
		if (!this.buttons) {
			this.buttons = element.all(by.css('app-root button'));
		}
		return this.buttons.get(0);
	}

	cancelButton() {
		if (!this.buttons) {
			this.buttons = element.all(by.css('app-root button'));
		}
		return this.buttons.get(1);
	}

	clickButton(element: ElementFinder) {
		element.click();
	}

	firstThrow(frame: number) {
		const firsts = element.all(by.css('.first'));
		return firsts.get(frame).getText();
	}

	setInput(element: ElementFinder, value: string): void {
		element.sendKeys(value);
	}

	secondThrow(frame: number) {
		const seconds = element.all(by.css('.second'));
		return seconds.get(frame).getText();
	}

	thirdThrow() {
		const third = element.all(by.css('.third'));
		return third.get(0).getText();
	}

	totalPoints(frame: number) {
		const total = element.all(by.css('.total'));
		return total.get(frame).getText();
	}
}
/*
element.sendKeys('fdasf');
beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          CommonModule,
          FormsModule,
          HttpModule,
          HttpClientModule,
        ],
      declarations: [
        BowlingScore
      ],
        providers: [
          { provide: APP_BASE_HREF, useValue: '/' }
        ]
      })
        .compileComponents();
    }));

    beforeEach(async(() => {
      this.fixture = TestBed.createComponent(BowlingScore);
      this.component = this.fixture.componentInstance;
      this.fixture.detectChanges();
    }));
    */
