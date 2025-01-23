import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location-history',
  templateUrl: './location-history.component.html',
  styleUrls: ['./location-history.component.sass'],
})
export class LocationHistoryComponent implements OnInit {
  history: Location[] = [];
  displayedColumns: string[] = ['name', 'country', 'action'];
  @Output() goBackEvent = new EventEmitter<void>();
  constructor(private router: Router) {}

  ngOnInit(): void {

    const storedHistory = localStorage.getItem('locationHistory');
    if (storedHistory) {
      this.history = JSON.parse(storedHistory);
    }

  }

  viewWeather(location: Location): void {

    this.router.navigate(['/weather'], {
      queryParams: {
        name: location.name,
        country: location.country,
        lat: location.lat,
        lon: location.lon,
      },
    });
  }

  goBack() {
    this.goBackEvent.emit();
  }

}

interface Location {
  name: string;
  local_names?: {};
  lat: number;
  lon: number;
  country: string;
  state?: string;
}
