import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlService } from '../../services/url/url.service';
import { Url } from '../../interfaces/url';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-single-url',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './single-url.component.html',
  styleUrl: './single-url.component.css',
})
export class SingleUrlComponent implements OnInit {
  public url?: Url;

  constructor(private route: ActivatedRoute, private urlService: UrlService) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.getUrlById(id);
      }
    });
  }

  public getUrlById(id: string): void {
    this.urlService.getUrlById(id).subscribe(
      (response: Url) => {
        this.url = response;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching URL:', error.message);
      }
    );
  }
}
