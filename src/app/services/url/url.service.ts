import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Url } from '../../interfaces/url';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  public apiServerUrl = environment.apiBaseUrl; // This is the url of the actual server
  public apiServer = environment.apiBase;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const authData = sessionStorage.getItem('authdata');

    return new HttpHeaders({
      Authorization: authData ? `Basic ${authData}` : '',
    });
  }

  public getAllUrls(): Observable<Url[]> {
    return this.http.get<Url[]>(`${this.apiServerUrl}`);
  }

  public getUrlById(id: string): Observable<Url> {
    return this.http
      .get<Url>(`${this.apiServerUrl}/${id}`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        catchError((error) => {
          console.error('Error fetching URL:', error);
          return throwError(() => new Error('Failed to fetch URL'));
        })
      );
  }

  public addUrl(url: Url): Observable<Url> {
    return this.http
      .post<Url>(`${this.apiServerUrl}`, url, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        catchError((error) => {
          console.error('Error adding URL:', error);
          return throwError(() => new Error('Failed to add URL'));
        })
      );
  }

  public editUrl(id: number, url: Partial<Url>): Observable<Url> {
    return this.http
      .put<Url>(`${this.apiServerUrl}/${id}`, url, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        catchError((error) => {
          console.error('Error updating URL:', error);
          return throwError(() => new Error('Failed to update URL'));
        })
      );
  }

  public deleteUrl(urlId: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiServerUrl}/${urlId}`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        catchError((error) => {
          console.error('Error deleting URL:', error);
          return throwError(() => new Error('Failed to delete URL'));
        })
      );
  }

  public deleteAllUrl(): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/urls/`);
  }
}
