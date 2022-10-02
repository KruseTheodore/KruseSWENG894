import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bourbon } from './bourbon';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BourbonService {
  private serverUrl = environment.testUrl;

  constructor(private http: HttpClient) {
    
   }

   /**
     * getBourbons
     */
    public getBourbons(): Observable<Bourbon[]> {
      return this.http.get<Bourbon[]>(`${this.serverUrl}/bourbon`)
    }

    /** 
    public addBourbon(bourbon: Bourbon): Observable<Bourbon> {
      return this.http.post<Bourbon>(`${this.serverUrl}/bourbon`, bourbon)
    }

    public updateBourbon(bourbon: Bourbon): Observable<Bourbon[]> {
      return this.http.put<Bourbon[]>(`${this.serverUrl}/bourbon`, bourbon)
    }

    public deleteBourbon(bourbonName: string): Observable<void> {
      return this.http.delete<void>(`${this.serverUrl}/bourbon/${bourbonName}`)
    }
    */
}
