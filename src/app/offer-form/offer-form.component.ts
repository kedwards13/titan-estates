import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PropertyService } from '../property.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule]
})
export class OfferFormComponent {
  offerForm: FormGroup;

  constructor(private fb: FormBuilder, private propertyService: PropertyService) {
    this.offerForm = this.fb.group({
      name: ['', Validators.required],
      phone_number: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      address: ['', Validators.required],
      details: ['', Validators.required],
      askingPrice: ['', Validators.required],
      additionalComments: ['']
    });
  }

  onSubmit() {
    if (this.offerForm.valid) {
      this.propertyService.submitPropertyDetails(this.offerForm.value).subscribe(response => {
        // handle response
      });
    }
  }
}

