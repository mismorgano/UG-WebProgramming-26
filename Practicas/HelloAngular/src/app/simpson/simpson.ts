import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SimpsonCharacter } from '../models/SimpsonCharacter';
import { Result } from '../models/Result';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInput, MatLabel } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatCard, MatCardContent, MatCardHeader, MatCardModule, MatCardSubtitle, MatCardTitle } from '@angular/material/card';

@Component({
  imports: [MatButtonModule, MatIconModule, MatInput, MatLabel, FormsModule, MatCardModule,  ],
  selector: 'app-simpson',
  styleUrl: './simpson.scss',
  templateUrl: './simpson.html',
})
export class Simpson implements OnInit {
  ngOnInit(): void {
    this.getCharacters();
    console.log(this.data);
  }
  private readonly http = inject(HttpClient);
  private readonly url = 'https://thesimpsonsapi.com/api/characters';

  data: SimpsonCharacter | any;
  characters: Result[] = [];

  getCharacters(): Observable<SimpsonCharacter> {
    this.http.get<SimpsonCharacter>(this.url).subscribe({
      next: (res) => {
        this.data = res;
      },
    });
    console.log(this.data);
    return this.data;
    // .subscribe((config) => {
    // console.log(config)
    // })
  }

  printCharacters() {
    this.characters = this.data.results;
    for (let char of this.characters) {
      console.log(char);
    }
  }
}
