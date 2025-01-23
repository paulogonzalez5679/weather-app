import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ApiHttpService } from './../services/api-http.service';
import { getFetchUrl } from '../services/url-paths';
import { Subject, Observable } from 'rxjs';
import { debounceTime, switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-search-location',
  templateUrl: './search-location.component.html',
  styleUrls: ['./search-location.component.sass'],
})
export class SearchLocationComponent implements OnInit, OnDestroy {
  searched = false;
  loaded = false;
  errorMessage: string = '';
  displayedColumns: string[] = ['name', 'country'];
  dataSource: Location[] = [];
  searchSubject = new Subject<string>();
  localTime: any;
  history: Location[] = [];
  showLocationHistory: boolean = false;
  showFavorite: boolean = false;

  constructor(private apiService: ApiHttpService, private router: Router) {

    const storedHistory = localStorage.getItem('locationHistory');
    if (storedHistory) {
      this.history = JSON.parse(storedHistory);
    }


    this.searchSubject.pipe(
      debounceTime(500),
      switchMap((cityCountry: string) => this.getLocations(cityCountry))
    ).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.dataSource = data as Location[];
          this.searched = true;
          this.loaded = true;
          this.errorMessage = '';
        } else {
          this.errorMessage = 'City not found. Please check your spelling.';
          this.searched = true;
          this.loaded = true;
        }
      },
      error: (err) => {
        this.errorMessage = 'City not found. Please check your spelling.';
        this.searched = true;
        this.loaded = true;
      },
      complete: () => {
        this.loaded = true;
      },
    });
  }

  ngOnInit() {
    window.addEventListener('beforeunload', this.clearLocalStorage);
  }

  ngOnDestroy() {
    window.removeEventListener('beforeunload', this.clearLocalStorage);
  }

  clearLocalStorage() {
    localStorage.removeItem('locationHistory');
  }

  getLocations(cityCountry: string): Observable<Location[]> {
    if (!cityCountry.trim()) {
      this.dataSource = [];
      this.searched = false;
      this.loaded = false;
      this.errorMessage = '';
      return new Observable<Location[]>();
    }

    const data = this.getCityAndCountry(cityCountry);
    const city = data.city;
    if (!city) {
      console.error('Missing parameters in query');
      this.errorMessage = 'City not found. Please check your spelling.';
      return new Observable<Location[]>();
    }
    const country = data.country;
    const fetchUrl = getFetchUrl(city, country);

    return this.apiService.get(fetchUrl).pipe(
      map((response: any) => {
        if (response && response.length > 0) {

          return response.map((item: any) => ({
            name: item.name,
            lat: item.lat,
            lon: item.lon,
            country: item.country,
          }));
        } else {

          this.errorMessage = 'City not found. Please check your spelling.';
          return [];
        }
      })
    );
  }

  onKeyUp(value: string) {
    this.searchSubject.next(value);
  }

  selectedLocation(selectedLocation: Location) {

    this.history.unshift(selectedLocation);
    if (this.history.length > 5) {
      this.history.pop();
    }


    localStorage.setItem('locationHistory', JSON.stringify(this.history));


    this.router.navigate(['/weather'], {
      queryParams: {
        name: selectedLocation.name,
        country: selectedLocation.country,
        lat: selectedLocation.lat,
        lon: selectedLocation.lon,
      },
    });
  }


  getCityAndCountry(inputString: string) {
    const location = inputString.split(',', 2);
    const trimmedLocation = location.map((element) => {
      return element.trim();
    });
    return {
      city: trimmedLocation[0],
      country: trimmedLocation[1],
    };
  }

  onGoBack() {
    this.showLocationHistory = false;
    this.showFavorite = false;
  }

  goToFavorites(): void {
    this.showFavorite = true;
    this.showLocationHistory = false
  }

}


interface Location {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
  local_names?: {};
}
