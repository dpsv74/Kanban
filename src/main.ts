import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { BoardComponent } from './app/board.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BoardComponent],
  template: '<app-board></app-board>'
})
export class App {}

bootstrapApplication(App);