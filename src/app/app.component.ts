// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
  `,
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, HttpClientModule]
})
export class AppComponent {}
