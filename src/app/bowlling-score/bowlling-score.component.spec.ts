import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BowllingScoreComponent } from './bowlling-score.component';

describe('BowllingScoreComponent', () => {
  let component: BowllingScoreComponent;
  let fixture: ComponentFixture<BowllingScoreComponent>;

  beforeEach(async(() => {
	TestBed.configureTestingModule({
		declarations: [ BowllingScoreComponent ]
	})
	.compileComponents();
  }));

  beforeEach(() => {
	fixture = TestBed.createComponent(BowllingScoreComponent);
	component = fixture.componentInstance;
	fixture.detectChanges();
  });

  it('should be created', () => {
	expect(component).toBeTruthy();
  });
});
