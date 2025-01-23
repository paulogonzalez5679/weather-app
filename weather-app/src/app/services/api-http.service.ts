import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import apiConfig from '../../assets/apiConfig.json';
@Injectable({
  providedIn: 'root',
})
export class ApiHttpService {
  constructor(private http: HttpClient) {}
  private apiKey = apiConfig.new_api_key;
  private apiUrl = apiConfig.new_weather_api;;

  public get(url: string, options?: any) {
    return this.http.get(url, options);
  }

  getWeatherData(latitude: string, longitude: string): Observable<any> {
    const url = `${this.apiUrl}?key=${this.apiKey}&q=${latitude},${longitude}`;
    return this.http.get<any>(url);
  }
}
