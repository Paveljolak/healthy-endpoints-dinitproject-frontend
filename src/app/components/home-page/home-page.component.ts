import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UrlService } from '../../services/url/url.service';
import { Url } from '../../interfaces/url';
import { HttpErrorResponse } from '@angular/common/http';
import { AddUrlModalComponent } from '../add-url-modal/add-url-modal.component';

@Component({
  selector: 'home-page-main',
  standalone: true,
  imports: [CommonModule, AddUrlModalComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  public urls: Url[] = [];
  showAddUrlModal = false;

  constructor(private urlService: UrlService) {}

  ngOnInit() {
    this.getAllUrls();
  }

  openAddUrlModal() {
    this.showAddUrlModal = true;
  }

  closeAddUrlModal() {
    this.showAddUrlModal = false;
  }

  onUrlAdded() {
    this.getAllUrls();
    this.closeAddUrlModal();
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
