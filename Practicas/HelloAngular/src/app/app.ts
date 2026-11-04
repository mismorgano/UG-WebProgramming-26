import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavBarComponent} from './nav-bar/nav-bar.component'

@Component({
  imports: [RouterOutlet, NavBarComponent],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('HelloAngular');
}
