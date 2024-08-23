import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HealthHistory } from '../../interfaces/health-history';
import { Url } from '../../interfaces/url';
import { catchError, Observable, of, forkJoin, switchMap, map } from 'rxjs';
import { UrlService } from '../url/url.service';

@Injectable({
  providedIn: 'root',
})
export class HealthHistoryService {
  private apiUrl = `${environment.apiBase}/health_history`;

  constructor(private http: HttpClient, private urlService: UrlService) {}

  // Generate HTTP headers with authentication
  private getAuthHeaders(): HttpHeaders {
    const authData = sessionStorage.getItem('authdata');
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
          const urlIds = Array.from(
            new Set(histories.map((h) => h.urlId.toString()))
          );

          const urlRequests = urlIds.map((id) =>
            this.urlService
              .getUrlById(id)
              .pipe(catchError(() => of({ fullUrl: 'Unknown URL' } as Url)))
          );

          return forkJoin(urlRequests).pipe(
            map((urls) => {
              const urlMap = new Map<string, string>(
                urls.map((url) => [url.urlId.toString(), url.fullUrl])
              );
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
        headers: this.getAuthHeaders(),
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
