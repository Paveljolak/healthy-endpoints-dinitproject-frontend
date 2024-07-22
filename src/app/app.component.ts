import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UrlService } from './url.service';
import { Url } from './url';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public urls: Url[] = [];

  constructor(private urlService: UrlService) {}

  ngOnInit() {
    this.getAllUrls();
  }

  public getAllUrls(): void {
    this.urlService.getAllUrls().subscribe(
      (response: Url[]) => {
        this.urls = response;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching URLs:', error.message);
      }
    );
  }
}
