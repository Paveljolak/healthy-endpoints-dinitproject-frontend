// header.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { CommonModule } from '@angular/common';
import { LogoutConfirmModalComponent } from '../logout-confirm-modal/logout-confirm-modal.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LogoutConfirmModalComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  showModal = false;
  currentUrl: string = '';

  constructor(
    private authenticationService: AuthenticationService,
    public router: Router
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentUrl = event.url;
      });
  }

  ngOnInit(): void {}

  openLogoutModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  logout() {
    this.authenticationService.logout();
    this.closeModal();
    this.router.navigateByUrl('/login');
  }

  isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  isLoginPage(): boolean {
    return this.currentUrl === '/login';
  }

  isRegisterPage(): boolean {
    return this.currentUrl === '/register';
  }

  navigateHome() {
    this.router.navigateByUrl('/home'); // Adjust this path as needed
  }

  hasAdmin(): boolean {
    return this.authenticationService.isAdmin();
  }
}
