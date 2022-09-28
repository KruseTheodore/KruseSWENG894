import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { map, Observable, tap } from 'rxjs';
import { Profile } from 'src/app/profile';
import { environment } from 'src/environments/environment';
import { LoginPayload } from '../login/login.payload';
import { LoginResponse } from '../login/login.response';
import { SignupPayload } from '../signup/signup.payload';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public serverUrl = environment.testUrl;
  

  constructor(private httpClient: HttpClient,
    private localstorage: LocalStorageService) { }

  signup(signupPayload: SignupPayload): Observable<any>{
    const options = {headers: {'ContentType': "application/json"}};
    return this.httpClient.post(`${this.serverUrl}/profile/new`, {"name": signupPayload.username, "password": signupPayload.password}, options);
  }

  checkUser(signupPayload: SignupPayload): Observable<boolean>{
     return this.httpClient.get<boolean>(`${this.serverUrl}/profile/check/${signupPayload.username}`)
  }

  login(loginPayload: LoginPayload): Observable<any>{
    let body = new URLSearchParams();
    body.set("username", loginPayload.username ??"");
    body.set("password", loginPayload.password ??"");
    this.localstorage.store('username', loginPayload.username);
    let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    let options = { headers: headers};
    return this.httpClient.post<LoginResponse>(`${this.serverUrl}/profile/login`, body, options).
    pipe(map(data => {
      this.localstorage.store('authenticationToken', data.access_token);
      this.localstorage.store('refreshToken', data.refresh_token);
    }));
  }

  logout(){
    let headers = new HttpHeaders().set('If-None-Match', 'Bearer ' + this.getRefreshToken());
    let options = { headers: headers};
    return this.httpClient.get(`${this.serverUrl}/profile/logout`, options).subscribe(data => {
    this.localstorage.clear('authenticationToken');
    this.localstorage.clear('refreshToken');
    this.localstorage.clear('username');
    })
  }

  refreshToken(){
    let headers = new HttpHeaders().set('If-Match', 'Bearer ' + this.getRefreshToken());
    let options = { headers: headers};

    return this.httpClient.get<LoginResponse>(`${this.serverUrl}/profile/refresh`, options).pipe(tap(data => {
      this.localstorage.store('authenticationToken', data.access_token);
      this.localstorage.store('refreshToken', data.refresh_token);
    }))

  }

  getJwtToken() {
    return this.localstorage.retrieve('authenticationToken');
  }

  getRefreshToken() {
    return this.localstorage.retrieve('refreshToken');
  }

  getUsername() {
    return this.localstorage.retrieve('name');
  }

  isLoggedIn(): boolean {
     if(this.getJwtToken() == null){
      return false;
     }
     else if(this.getJwtToken() == undefined){
      return false;
     }
     else{
      return true;
     }
  
  }
}


