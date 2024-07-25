import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../interfaces/user';
import { environment } from '../../../environments/environment.development';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public apiServer = environment.apiBase;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const authData = sessionStorage.getItem('authdata'); // Base64 credentials from sessionStorage

    return new HttpHeaders({
      Authorization: authData ? `Basic ${authData}` : '',
    });
  }

  getAllUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(`${this.apiServer}/users`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        catchError((error) => {
          console.error('Error fetching users:', error);
          return throwError(() => new Error('Failed to fetch users'));
        })
      );
  }

  getUserById(userId: number): Observable<User> {
    return this.http
      .get<User>(`${this.apiServer}/users/${userId}`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        catchError((error) => {
          console.error('Error fetching user by ID:', error);
          return throwError(() => new Error('Failed to fetch user by ID'));
        })
      );
  }

  deleteUserById(userId: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiServer}/users/${userId}`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        catchError((error) => {
          console.error('Error deleting user:', error);
          return throwError(() => new Error('Failed to delete user'));
        })
      );
  }

  addUser(username: string, password: string, email: string): Observable<any> {
    // Log the data being sent to the backend
    console.log('Sending to backend:', {
      username,
      password,
      email,
    });

    // Send user data to backend
    return this.http.post<any>(
      'http://localhost:8080/auth/register', // Updated URL
      {
        username,
        password,
        email,
      },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }
    );
  }

  getUserRole(): Observable<string> {
    return this.http
      .get<{ role: string }>(`${this.apiServer}/users/:id`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        map((response) => response.role),
        catchError((error) => {
          console.error('Error fetching user role:', error);
          return throwError(() => new Error('Failed to fetch user role'));
        })
      );
  }
}
