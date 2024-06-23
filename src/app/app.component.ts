import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  data: any;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.apiService.getData().pipe(
      catchError(error => {
        console.error('Error fetching data:', error);
        return of(null); 
      })
    ).subscribe(
      (response) => {
        this.data = response;
      }
    );
  }
}