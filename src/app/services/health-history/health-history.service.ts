import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HealthHistory } from '../../interfaces/health-history';
import { Url } from '../../interfaces/url'; // Import Url interface
import { catchError, Observable, of, forkJoin, switchMap, map } from 'rxjs';
import { UrlService } from '../url/url.service'; // Import UrlService

@Injectable({
  providedIn: 'root',
})
export class HealthHistoryService {
  private apiUrl = `${environment.apiBase}/health_history`;

  constructor(
    private http: HttpClient,
    private urlService: UrlService // Inject UrlService
  ) {}

  // Generate HTTP headers with authentication
  private getAuthHeaders(): HttpHeaders {
    const authData = sessionStorage.getItem('authdata'); // Base64 credentials from sessionStorage
    return new HttpHeaders({
      Authorization: authData ? `Basic ${authData}` : '',
    });
  }

  // Get health histories by URL ID
  getHealthHistoriesByUrlId(urlId: number): Observable<HealthHistory[]> {
    return this.http
      .get<HealthHistory[]>(`${this.apiUrl}/${urlId}`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        catchError(
          this.handleError<HealthHistory[]>('getHealthHistoriesByUrlId', [])
        )
      );
  }

  getAllHealthHistories(): Observable<(HealthHistory & { fullUrl: string })[]> {
    return this.http
      .get<HealthHistory[]>(this.apiUrl, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        catchError(
          this.handleError<HealthHistory[]>('getAllHealthHistories', [])
        ),
        switchMap((histories) => {
          // Extract unique URL IDs and convert them to strings
          const urlIds = Array.from(
            new Set(histories.map((h) => h.urlId.toString()))
          );

          // Fetch URL details for each unique URL ID
          const urlRequests = urlIds.map((id) =>
            this.urlService.getUrlById(id).pipe(
              catchError(() => of({ fullUrl: 'Unknown URL' } as Url)) // Handle URL fetch errors
            )
          );

          return forkJoin(urlRequests).pipe(
            map((urls) => {
              // Create a mapping from URL ID to full URL
              const urlMap = new Map<string, string>(
                urls.map((url) => [url.urlId.toString(), url.fullUrl])
              );

              // Combine health histories with their full URLs
              return histories.map((history) => ({
                ...history,
                fullUrl: urlMap.get(history.urlId.toString()) || 'Unknown URL',
              }));
            })
          );
        })
      );
  }

  addHealthHistory(urlId: number): Observable<HealthHistory> {
    return this.http
      .post<HealthHistory>(`${this.apiUrl}/${urlId}`, null, {
        headers: this.getAuthHeaders(),
      })
      .pipe(catchError(this.handleError<HealthHistory>('addHealthHistory')));
  }

  deleteHealthHistory(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`, {
        headers: this.getAuthHeaders(), // Add the auth headers here
      })
      .pipe(catchError(this.handleError<void>('deleteHealthHistory')));
  }

  // Handle HTTP errors
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
