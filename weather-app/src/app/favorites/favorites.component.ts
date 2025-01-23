import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.sass']
})
export class FavoritesComponent implements OnInit {
  favorites: any[] = [];
  displayedColumns: string[] = ['name', 'country', 'viewWeather', 'remove'];

  @Output() goBackEvent = new EventEmitter<void>();

  constructor(private router: Router) {}

  ngOnInit(): void {

    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      this.favorites = JSON.parse(storedFavorites);
    }
  }


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


  removeFavorite(favorite: any): void {

    this.favorites = this.favorites.filter(
      (item) => item.name !== favorite.name || item.country !== favorite.country
    );

    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }


  goBack() {
    this.goBackEvent.emit();
  }
}
