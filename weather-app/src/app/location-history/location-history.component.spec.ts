import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationHistoryComponent } from './location-history.component';

describe('LocationHistoryComponent', () => {
  let component: LocationHistoryComponent;
  let fixture: ComponentFixture<LocationHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocationHistoryComponent]
    });
    fixture = TestBed.createComponent(LocationHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
