import { Routes } from '@angular/router';
import { Hello } from './hello/hello';
import { Simpson } from './simpson/simpson';
export const routes: Routes = [
  { path: 'hello', component: Hello },
  { path: 'simpson', component: Simpson },
];
