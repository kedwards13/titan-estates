import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private apiUrl = 'http://localhost:8000/api/properties/';

  constructor(private http: HttpClient) { }

  submitPropertyDetails(propertyData: any): Observable<any> {
    return this.http.post(this.apiUrl, propertyData);
  }
}
