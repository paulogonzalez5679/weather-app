import { Observable } from 'rxjs';
import apiConfig from '../../assets/apiConfig.json';
import { HttpClient } from '@angular/common/http';
var http: HttpClient
export function getFetchUrl(city: string, country: string) {
  const url =
    apiConfig.location_api +
    'direct?q=' +
    city +
    ',,' +
    country +
    '&limit=3&appid=' +
    apiConfig.api_key;
  return url;
}

export function getUrlFromParams(latitude: number, longitude: number) {
  const url =
    apiConfig.weather_api +
    'weather?lat=' +
    latitude +
    '&lon=' +
    longitude +
    '&appid=' +
    apiConfig.api_key +
    '&units=metric';
  return url;
}

export function getIconUrl(weatherIcon: string) {
  const url = apiConfig.icon_url + weatherIcon + '@2x.png';
  return url;
}

export function getWeatherData(latitude: string, longitude: string): Observable<any> {

  const url = `${apiConfig.new_weather_api}?key=${apiConfig.new_api_key}&q=${latitude},${longitude}`;
  return http.get<any>(url);
}

