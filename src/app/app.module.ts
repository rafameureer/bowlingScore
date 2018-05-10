import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BowllingScoreComponent } from './bowlling-score/bowlling-score.component';

@NgModule({
  declarations: [
	AppComponent,
	BowllingScoreComponent
  ],
  imports: [
	BrowserModule,
	FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
