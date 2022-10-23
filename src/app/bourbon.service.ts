import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bourbon } from './bourbon';
import { environment } from 'src/environments/environment';
import { BourbonPayload } from './new-bourbon/bourbon.payload';
import { Review } from './review';

@Injectable({
  providedIn: 'root'
})
export class BourbonService {
  private serverUrl = environment.testUrl;

  constructor(private httpClient: HttpClient) {
    
   }

   /**
     * getBourbons
     */
    public getBourbons(): Observable<Bourbon[]> {
      return this.httpClient.get<Bourbon[]>(`${this.serverUrl}/bourbon`)
    }

    public addBourbon(bourbonPayload: BourbonPayload): Observable<any> {
      const options = {headers: {'ContentType': "application/json"}};
      return this.httpClient.post(`${this.serverUrl}/bourbon`, {
      "name": bourbonPayload.name,
      "distil": bourbonPayload.distil, 
      "proof": bourbonPayload.proof}, options)
    }

    public getReviewsOnBourbon(name: string): Observable<Review[]> {
      return this.httpClient.get<Review[]>(`${this.serverUrl}/review/bourbons/${name}`)
   }


    /** 
    public updateBourbon(bourbon: Bourbon): Observable<Bourbon[]> {
      return this.http.put<Bourbon[]>(`${this.serverUrl}/bourbon`, bourbon)
    }

    public deleteBourbon(bourbonName: string): Observable<void> {
      return this.http.delete<void>(`${this.serverUrl}/bourbon/${bourbonName}`)
    }
    */
}
