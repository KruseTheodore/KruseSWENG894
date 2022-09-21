import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profile } from './profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private serverUrl = environment.testUrl;

  constructor(private http: HttpClient) {
    
   }

    public getProfiles(): Observable<Profile[]> {
      return this.http.get<Profile[]>(`${this.serverUrl}/profile`)
    }

}
