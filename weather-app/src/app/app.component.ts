import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  ngOnInit() {
    window.addEventListener('beforeunload', () => {
      localStorage.removeItem('locationHistory');
      localStorage.removeItem('favorites');
    });
  }
}
