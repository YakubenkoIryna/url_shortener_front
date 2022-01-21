import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UrlShortenerService {

  constructor(
    private http: HttpClient
  ) { }


  getShortenedURL(link: string ): Observable<{ linkHash: string }> {
    return this.http.get<{ linkHash: string }>('http://localhost:3000/api/generateURL', {params: {link}});
  }

  getURL(hash: string): Observable<{ link: string }> {
    return this.http.get<{ link: string }>('http://localhost:3000/api/redirectURL', {params: {hash}});
  }
}
