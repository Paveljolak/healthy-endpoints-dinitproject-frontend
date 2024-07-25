import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UrlService } from '../../services/url/url.service';
import { Url } from '../../interfaces/url';
import { HttpErrorResponse } from '@angular/common/http';
import { AddUrlModalComponent } from '../add-url-modal/add-url-modal.component';
import { EditUrlModalComponent } from '../edit-url-modal/edit-url-modal.component'; // Import the new component
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'home-page-main',
  standalone: true,
  imports: [CommonModule, AddUrlModalComponent, EditUrlModalComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  public urls: Url[] = [];
  showAddUrlModal = false;
  showEditUrlModal = false;
  currentUrl: Url | null = null; // For editing
  isLoggedIn = false;

  constructor(
    private urlService: UrlService,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.getAllUrls();
    this.isLoggedIn = this.authService.isLoggedIn();
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

  openEditUrlModal(url: Url) {
    this.currentUrl = url;
    this.showEditUrlModal = true;
  }

  closeEditUrlModal() {
    this.showEditUrlModal = false;
    this.getAllUrls();
    this.currentUrl = null;
  }

  onUrlUpdated(updatedUrl: Url) {
    this.urls = this.urls.map((url) =>
      url.urlId === updatedUrl.urlId ? updatedUrl : url
    );
    this.closeEditUrlModal();
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

  deleteUrl(urlId: number): void {
    if (confirm('Are you sure you want to delete this URL?')) {
      this.urlService.deleteUrl(urlId).subscribe({
        next: () => {
          this.urls = this.urls.filter((url) => url.urlId !== urlId);
          console.log('URL deleted successfully');
        },
        error: (err) => {
          console.error('Error deleting URL:', err);
        },
      });
    }
  }
}
