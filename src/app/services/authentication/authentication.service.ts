import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { RegisterUserData } from '../../interfaces/register-user-data';
import { UrlService } from '../url/url.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private userSubject: BehaviorSubject<RegisterUserData | null>;
  public user: Observable<RegisterUserData | null>;
  private currentUser: RegisterUserData | null = null;

  constructor(private http: HttpClient, private urlService: UrlService) {
    this.userSubject = new BehaviorSubject<RegisterUserData | null>(null);
    this.user = this.userSubject.asObservable();
  }

  getSingleUrl(): Observable<any> {
    return this.http.get('http://localhost:8080/urls/names');
  }

  login(username: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.urlService.apiServer}/auth/login`, {
        username,
        password,
      })
      .pipe(
        map((response) => {
          const encodedCredentials = btoa(`${username}:${password}`);
          sessionStorage.setItem('authdata', encodedCredentials);
          sessionStorage.setItem('id', response.id);
          sessionStorage.setItem('role', response.role);
          return response;
        })
      );
  }

  register(username: string, password: string, email: string): Observable<any> {
    return this.http
      .post<any>(`${this.urlService.apiServer}/auth/register`, {
        username,
        password,
        email,
      })
      .pipe(
        map((response) => {
          const encodedCredentials = btoa(`${username}:${password}`);
          sessionStorage.setItem('authdata', encodedCredentials);
          return response;
        })
      );
  }

  logout(): void {
    sessionStorage.removeItem('authdata');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('role');
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('authdata');
  }

  getRole(): string | null {
    return sessionStorage.getItem('role');
  }

  isAdmin(): boolean {
    const role = this.getRole();

    if (role != null) {
      sessionStorage.setItem('read role: ', role);
    }

    return role === 'ADMIN,USER';
  }
}
