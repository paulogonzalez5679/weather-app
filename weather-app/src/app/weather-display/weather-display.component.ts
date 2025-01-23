import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiHttpService } from '../services/api-http.service';

@Component({
  selector: 'app-weather-display',
  templateUrl: './weather-display.component.html',
  styleUrls: ['./weather-display.component.sass'],
})
export class WeatherDisplayComponent implements OnInit {
  name = '';
  country = '';
  currentWeather: any = {};
  temperature: number = 0;
  temperatureFeelsLike: number = 0;
  localTime: string = '';
  iconUrl = '';
  loaded = false;
  isFavorite: boolean = false;  // Para verificar si la ciudad está en favoritos

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiHttpService,
    private router: Router // Inyectamos el Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const info = this.getInfoFromParams(params);
      if (!info) {
        console.error('Missing parameters in query');
        return;
      }
      this.name = info.name;
      this.country = info.country;

      this.apiService.getWeatherData(info.latitude, info.longitude).subscribe({
        next: (data) => {
          this.currentWeather = data;

          this.iconUrl = 'https:' + this.currentWeather.current.condition.icon;
          this.temperature = Math.round(this.currentWeather.current.temp_c);
          this.temperatureFeelsLike = Math.round(this.currentWeather.current.feelslike_c);

          // Obteniendo la hora local directamente desde la respuesta de la API
          this.localTime = this.currentWeather.location.localtime;

          this.loaded = true;

          // Verificamos si esta ciudad está en favoritos
          this.checkIfFavorite(info.name, info.country);
        },
        error: (err) => console.error(err),
      });
    });
  }

  // Verifica si la ciudad está en los favoritos
  checkIfFavorite(name: string, country: string): void {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const isAlreadyFavorite = favorites.some(
      (item: any) => item.name === name && item.country === country
    );
    this.isFavorite = isAlreadyFavorite;
  }

  // Añadir o eliminar de los favoritos
  toggleFavorite(): void {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    if (this.isFavorite) {
      // Eliminar de los favoritos
      favorites = favorites.filter(
        (item: any) => item.name !== this.name || item.country !== this.country
      );
    } else {
      // Agregar a los favoritos
      favorites.push({ name: this.name, country: this.country, lat: this.route.snapshot.queryParamMap.get('lat'), lon: this.route.snapshot.queryParamMap.get('lon') });
    }

    // Guardar en localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));
    this.isFavorite = !this.isFavorite;
  }

  getInfoFromParams(params: Params) {
    const name = params['name'];
    const country = params?.['country'];
    const latitude = params?.['lat'];
    const longitude = params?.['lon'];

    if (!params || !name || !country || !latitude || !longitude) return null;

    return {
      name,
      country,
      latitude,
      longitude,
    };
  }

  goToAnotherLocation() {
    this.router.navigate(['/']);
  }
}
