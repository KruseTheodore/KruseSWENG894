import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SignupComponent } from '../signup/signup.component';
import { SignupPayload } from '../signup/signup.payload';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public serverUrl = environment.testUrl;
  

  constructor(private httpClient: HttpClient) { }

  signup(signupPayload: SignupPayload): Observable<any>{
    const options = {headers: {'ContentType': "application/json"}};
    return this.httpClient.post(`${this.serverUrl}/profile/new`, {"name": signupPayload.username, "password": signupPayload.password}, options);
  }
}


