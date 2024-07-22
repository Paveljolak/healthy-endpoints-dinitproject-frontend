import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Url } from './url';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  private apiServerUrl = environment.apiBaseUrl; // This is the url of the actual server

  constructor(private http: HttpClient) {}

  // getAllUrls
  //  http://localhost:8080/urls

  public getAllUrls(): Observable<Url[]> {
    return this.http.get<Url[]>(`${this.apiServerUrl}/urls`); // this probably will be just ${this.apiServerUrl}/
  }

  // getUrl -- it is based by id
  // http://localhost:8080/urls/10
  public getUrl(urlId: number): Observable<Url> {
    return this.http.get<Url>(`${this.apiServerUrl}/urls${urlId}`); // this probably will be just ${this.apiServerUrl}/ again
  }

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
