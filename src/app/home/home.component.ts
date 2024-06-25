// src/app/home/home.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferFormComponent } from '../offer-form/offer-form.component';
import { ServicesComponent } from '../services/services.component';
import { TestimonialsComponent } from '../testimonials/testimonials.component';
import { HttpClientModule } from '@angular/common/http'; // Add this import

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    OfferFormComponent,
    ServicesComponent,
    TestimonialsComponent
  ]
})
export class HomeComponent {}
