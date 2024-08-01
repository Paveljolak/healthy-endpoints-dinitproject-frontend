import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { UrlService } from '../../services/url/url.service';
import { Url } from '../../interfaces/url';
import { HttpErrorResponse } from '@angular/common/http';
import { AddUrlModalComponent } from '../add-url-modal/add-url-modal.component';
import { EditUrlModalComponent } from '../edit-url-modal/edit-url-modal.component';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';

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
  isAdmin = false; // Track if the current user is an admin
  currentUserId: number | null = null; // Store the current user ID

  constructor(
    private urlService: UrlService,
    private authService: AuthenticationService,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.getAllUrls();
    this.isLoggedIn = this.authService.isLoggedIn();
    this.currentUserId = this.parseUserIdFromSession(); // Retrieve and parse user ID from session storage
    this.isAdmin = this.checkIfAdmin(); // Determine if the user is an admin
  }

  private parseUserIdFromSession(): number | null {
    const idString = sessionStorage.getItem('id');
    return idString ? parseInt(idString, 10) : null; // Convert string to number
  }

  private checkIfAdmin(): boolean {
    const role = sessionStorage.getItem('role'); // Adjust this based on your role management
    return role === 'ADMIN,USER'; // Assuming 'admin' is the role identifier for admin users
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

  viewUrlDetails(urlId: number): void {
    this.router.navigate([`/urls/${urlId}`]); // Navigate to the URL details route
  }

  viewUrlHistory(urlId: number): void {
    this.router.navigate([`/health-history/${urlId}`]); // Navigate to health history details route
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

  formatDate(dateString?: string): string {
    return this.datePipe.transform(dateString || '', 'short') || 'Never';
  }

  isOwner(url: Url): boolean {
    return (
      this.currentUserId !== null && url.addedByUserId === this.currentUserId
    );
  }

  canPerformAction(url: Url): boolean {
    return this.isAdmin || this.isOwner(url);
  }
}
