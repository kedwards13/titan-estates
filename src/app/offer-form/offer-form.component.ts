import { Component, NgZone, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressFormComponent } from '../address-form/address-form.component';
import { PropertyDetailsFormComponent } from '../property-details-form/property-details-form.component';
import { PropertyService } from '../property.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';

@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatStepperModule,
    AddressFormComponent,
    PropertyDetailsFormComponent
  ]
})
export class OfferFormComponent implements AfterViewInit {
  addressForm: FormGroup;
  propertyDetailsForm: FormGroup;
  currentStep: number = 1;
  address: string | undefined;
  map!: google.maps.Map;

  constructor(private fb: FormBuilder, private propertyService: PropertyService, private ngZone: NgZone) {
    this.addressForm = this.fb.group({
      address: ['', Validators.required]
    });
    this.propertyDetailsForm = this.fb.group({
      propertyType: ['', Validators.required],
      rooms: ['', Validators.required],
      bathrooms: ['', Validators.required],
      condition: ['', Validators.required],
      askingPrice: ['', Validators.required],
      additionalComments: [''],
      sellTimeline: ['', Validators.required]
    });
  }

  ngAfterViewInit() {
    this.initMap(); // Initialize the map in the offer form component
  }

  initMap() {
    this.map = new google.maps.Map(document.getElementById('verify-map') as HTMLElement, {
      center: { lat: 35.50, lng: -90.35 },
      zoom: 4
    });
  }

  showAddressOnMap(location: google.maps.LatLng) {
    this.map.setCenter(location);
  // Zoom into the location
    new google.maps.Marker({
      position: location,
      map: this.map
    });
  }

  onAddressSubmitted(address: string) {
    this.address = address;
    this.currentStep = 2;
    this.showAddressOnMap(new google.maps.LatLng(35.50, -90.35)); // Dummy location, update with actual location if available
  }

  verifyAddress(correct: boolean) {
    if (correct) {
      this.currentStep = 3;
    } else {
      this.currentStep = 1;
    }
  }

  onDetailsSubmitted(propertyDetails: any) {
    const fullDetails = {
      address: this.address,
      ...propertyDetails
    };

    this.propertyService.submitPropertyDetails(fullDetails).subscribe(response => {
      // handle response
      this.currentStep = 4; // Move to the thank you message step
    });
  }
}
