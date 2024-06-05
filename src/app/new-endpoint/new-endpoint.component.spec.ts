import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEndpointComponent } from './new-endpoint.component';

describe('NewEndpointComponent', () => {
  let component: NewEndpointComponent;
  let fixture: ComponentFixture<NewEndpointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewEndpointComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewEndpointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
