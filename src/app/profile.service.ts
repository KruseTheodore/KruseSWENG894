import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Message } from './message';
import { MessagePayload } from './message.payload';
import { Profile } from './profile';
import { Review } from './review';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private serverUrl = environment.testUrl;

  constructor(private httpClient: HttpClient) {
    
   }

    public getProfiles(): Observable<Profile[]> {
      return this.httpClient.get<Profile[]>(`${this.serverUrl}/profile`)
    }

    public getProfileByName(name: string): Observable<Profile> {
      return this.httpClient.get<Profile>(`${this.serverUrl}/profile/byname/${name}`)
    }

    public getReviewsOnProfile(name: string): Observable<Review[]> {
       return this.httpClient.get<Review[]>(`${this.serverUrl}/review/profiles/${name}`)
    }

    public followUser(name: string, follow: string): Observable<any> {
      return this.httpClient.post(`${this.serverUrl}/profile/follow/${name}/${follow}`, null)
    }

    public unfollowUser(name: string, follow: string): Observable<any> {
      return this.httpClient.delete(`${this.serverUrl}/profile/unfollow/${name}/${follow}`)
    }

    public getConversation(usernameto: string, usernamefrom: string): Observable<Message[]> {
      return this.httpClient.get<Message[]>(`${this.serverUrl}/message/${usernameto}/${usernamefrom}`)
    }

    addMessage(messagePayload: MessagePayload): Observable<any>{
      const options = {headers: {'ContentType': "application/json"}};
      return this.httpClient.post(`${this.serverUrl}/message`, {"userNameTo": messagePayload.userNameTo, "userNameFrom": messagePayload.userNameFrom, "message": messagePayload.message}, options);
    }

}
