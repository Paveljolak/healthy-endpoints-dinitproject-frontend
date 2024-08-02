import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../interfaces/user';
import { environment } from '../../../environments/environment.development';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';

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

  getUserRole(userId: number): Observable<string> {
    return this.getUserById(userId).pipe(
      map((user) => user.role),
      catchError((error) => {
        console.error('Error fetching user role:', error);
        return throwError(() => new Error('Failed to fetch user role'));
      })
    );
  }

  getCurrentUser(): Observable<User> {
    const userId = sessionStorage.getItem('id'); // userId might be null
    if (userId === null) {
      return throwError(() => new Error('User ID not found'));
    }
    const id = +userId;
    return this.getUserById(id);
  }

  editUser(userId: number, userUpdates: Partial<User>): Observable<User> {
    return this.http
      .patch<User>(`${this.apiServer}/users/edit/${userId}`, userUpdates, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        catchError((error) => {
          console.error('Error editing user:', error);
          return throwError(() => new Error('Failed to edit user'));
        })
      );
  }
}
