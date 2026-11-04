import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';

import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatLabel } from '@angular/material/input';

@Component({
  imports: [MatButtonModule, MatIconModule, MatInput, MatLabel, FormsModule],
  selector: 'app-hello',
  styleUrl: './hello.scss',
  templateUrl: './hello.html',
})
export class Hello {
  name: string = 'Antonio';
  isVisible: boolean = false;
  edad: number = 0;

  show() {
    this.isVisible = !this.isVisible;
    alert(this.edad);
  }
}
