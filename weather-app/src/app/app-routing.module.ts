import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchLocationComponent } from './search-location/search-location.component';
import { WeatherDisplayComponent } from './weather-display/weather-display.component';
import { LocationHistoryComponent } from './location-history/location-history.component';
import { FavoritesComponent } from './favorites/favorites.component';

const routes: Routes = [

  {
    path: '',
    component: SearchLocationComponent
  },
  {
    path: 'weather',
    component: WeatherDisplayComponent
  },
  { path: 'location-history', component: LocationHistoryComponent },
  { path: '', redirectTo: '/location-history', pathMatch: 'full' },
  { path: 'favorites', component: FavoritesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
