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
    const authData = sessionStorage.getItem('authdata'); // Base64 credentials from sessionStorage

    return new HttpHeaders({
      Authorization: authData ? `Basic ${authData}` : '',
    });
  }

  // getAllUrls
  //  http://localhost:8080/urls

  public getAllUrls(): Observable<Url[]> {
    return this.http.get<Url[]>(`${this.apiServerUrl}`); // this probably will be just ${this.apiServerUrl}/
  }

  // getUrl -- it is based by id
  // http://localhost:8080/urls/10

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

  // Set up basic authentication header with the stored auth data
  // const headers = new HttpHeaders({
  //   Authorization: `Basic ${authData}`,
  // });

  // Perform the HTTP GET request with the headers

  // public getUrlById(id: string): Observable<Url> {
  //  return this.http.get<Url>(`${this.apiServerUrl}/${id}`);
  // }

  // Fetch a URL by ID

  // addUrl
  // http://localhost:8080/urls
  // addUrl
  // http://localhost:8080/register/user
  // {
  // "urlName": "From User 3.2",
  //  "fullUrl": "https://facebook.com/"
  // }
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

  // editUrl
  // http://localhost:8080/urls/30
  // {
  //  "urlName": "Unreachable",
  //  "fullUrl": "http://thislinkwillbeundreach/"
  // }

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
  // deleteUrl -- based on id
  // http://localhost:8080/urls/3
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

  // deleteAllUrls
  // http://localhost:8080/urls/3
  public deleteAllUrl(): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/urls/`); // this probably will be just ${this.apiServerUrl}/ again
  }
}
