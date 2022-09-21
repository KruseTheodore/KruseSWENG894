import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Review } from './review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private serverUrl = environment.testUrl;

  constructor(private http: HttpClient) {
    
   }

    public getProfiles(): Observable<Review[]> {
      return this.http.get<Review[]>(`${this.serverUrl}/profile`)
    }

}
