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

  // getAllUrls
  //  http://localhost:8080/urls

  public getAllUrls(): Observable<Url[]> {
    return this.http.get<Url[]>(`${this.apiServerUrl}`); // this probably will be just ${this.apiServerUrl}/
  }

  // getUrl -- it is based by id
  // http://localhost:8080/urls/10

  public getUrlById(id: string): Observable<Url> {
    const authData = sessionStorage.getItem('authdata');

    if (!authData) {
      return throwError(
        () => new Error('Authentication data not found in localStorage')
      );
    }

    // Set up basic authentication header with the stored auth data
    const headers = new HttpHeaders({
      Authorization: `Basic ${authData}`,
    });

    // Perform the HTTP GET request with the headers
    return this.http.get<Url>(`${this.apiServerUrl}/${id}`, { headers }).pipe(
      catchError((error) => {
        console.error('Error fetching URL:', error);
        return throwError(() => new Error('Failed to fetch URL'));
      })
    );
  }

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
    return this.http.post<Url>(`${this.apiServerUrl}/urls`, url); // this probably will be just ${this.apiServerUrl}/ again
  }

  // editUrl
  // http://localhost:8080/urls/30
  // {
  //  "urlName": "Unreachable",
  //  "fullUrl": "http://thislinkwillbeundreach/"
  // }

  public editUrl(url: Url, urlId: number): Observable<Url> {
    return this.http.put<Url>(`${this.apiServerUrl}/urls/${urlId}`, url); // probably ${this.apiServerUrl}/id/edit or some shit depends how it is in backend
  }

  // deleteUrl -- based on id
  // http://localhost:8080/urls/3
  public deleteUrl(urlId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/urls/${urlId}`); // this probably will be just ${this.apiServerUrl}/ again
  }

  // deleteAllUrls
  // http://localhost:8080/urls/3
  public deleteAllUrl(): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/urls/`); // this probably will be just ${this.apiServerUrl}/ again
  }
}
