import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { OfferFormComponent } from './offer-form/offer-form.component';
import { ServicesComponent } from './services/services.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'offer-form', component: OfferFormComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'testimonials', component: TestimonialsComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '' }
];

