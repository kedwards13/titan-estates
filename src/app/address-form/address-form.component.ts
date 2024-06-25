import { Component, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class AddressFormComponent implements AfterViewInit {
  addressForm: FormGroup;
  @Output() addressSubmitted = new EventEmitter<string>();
  @ViewChild('addressInput') addressInput!: ElementRef;
  map!: google.maps.Map;

  constructor(private fb: FormBuilder, private ngZone: NgZone) {
    this.addressForm = this.fb.group({
      address: ['', Validators.required]
    });
  }

  ngAfterViewInit() {
    this.initAutocomplete();
    this.initMap();
  }

  initAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(this.addressInput.nativeElement, {
      types: ['address']
    });

    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        const place: google.maps.places.PlaceResult = autocomplete.getPlace();
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }

        this.addressForm.controls['address'].setValue(place.formatted_address);
        this.showAddressOnMap(place.geometry.location);
      });
    });
  }

  initMap() {
    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: { lat: 35.50, lng: -90.35 },
      zoom: 4
    });
  }

  showAddressOnMap(location: google.maps.LatLng) {
    this.map.setCenter(location);
    new google.maps.Marker({
      position: location,
      map: this.map
    });
  }

  onAddressSubmit() {
    if (this.addressForm.valid) {
      const address = this.addressForm.get('address')?.value;
      this.addressSubmitted.emit(address);
    }
  }
}
