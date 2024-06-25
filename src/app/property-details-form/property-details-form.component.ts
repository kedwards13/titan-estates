import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-property-details-form',
  templateUrl: './property-details-form.component.html',
  styleUrls: ['./property-details-form.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule
  ]
})
export class PropertyDetailsFormComponent {
  propertyDetailsForm: FormGroup;
  @Output() formSubmitted = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.propertyDetailsForm = this.fb.group({
      propertyType: ['', Validators.required],
      rooms: ['', Validators.required],
      bathrooms: ['', Validators.required],
      condition: ['', Validators.required],
      askingPrice: ['', Validators.required],
      sellingTimeframe: ['', Validators.required],
      additionalComments: ['']
    });
  }

  onDetailsSubmit() {
    if (this.propertyDetailsForm.valid) {
      this.formSubmitted.emit(this.propertyDetailsForm.value);
    }
  }
}
