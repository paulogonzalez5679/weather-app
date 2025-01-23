import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.sass']
})
export class FavoritesComponent implements OnInit {
  favorites: any[] = [];
  displayedColumns: string[] = ['name', 'country', 'viewWeather', 'remove']; // Definimos las columnas para las acciones

  @Output() goBackEvent = new EventEmitter<void>();

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Recuperamos los favoritos desde el localStorage
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      this.favorites = JSON.parse(storedFavorites);
    }
  }

  // Navegar a la página del clima para una ciudad
  viewWeather(favorite: any): void {
    this.router.navigate(['/weather'], {
      queryParams: {
        name: favorite.name,
        country: favorite.country,
        lat: favorite.lat,
        lon: favorite.lon,
      },
    });
  }

  // Eliminar un favorito
  removeFavorite(favorite: any): void {
    // Filtramos el arreglo para eliminar el favorito
    this.favorites = this.favorites.filter(
      (item) => item.name !== favorite.name || item.country !== favorite.country
    );
    // Guardamos nuevamente el arreglo actualizado en el localStorage
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  // Emite un evento para volver a la pantalla principal
  goBack() {
    this.goBackEvent.emit();
  }
}
