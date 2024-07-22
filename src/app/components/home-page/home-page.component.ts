import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UrlService } from '../../services/url/url.service';
import { Url } from '../../interfaces/url';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'home-page-main',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
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
