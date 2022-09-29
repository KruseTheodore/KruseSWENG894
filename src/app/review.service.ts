import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReviewPayload } from './new-review/review.payload';
import { Review } from './review';
import { LocalStorageService } from 'ngx-webstorage';
import { Profile } from './profile';
import { AuthService } from './auth/shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private serverUrl = environment.testUrl;
  username: string;


  constructor(private httpClient: HttpClient, private authService: AuthService) {
    username: '';
   }

    public getReviews(): Observable<Review[]> {
      return this.httpClient.get<Review[]>(`${this.serverUrl}/review`)
    }

    newReview(reviewPayload: ReviewPayload): Observable<any>{
      const options = {headers: {'ContentType': "application/json"}};
      return this.httpClient.post(`${this.serverUrl}/review`, {
      "name": reviewPayload.name,
      "rating": reviewPayload.rating, 
      "taste": reviewPayload.taste, 
      "nose": reviewPayload.nose, 
      "mouthfeel": reviewPayload.mouthfeel, 
      "value": reviewPayload.value, 
      "availability": reviewPayload.availability, 
      "content": reviewPayload.content, 
      "Profile_id": this.authService.getUsername(), 
      "Bourbon_id": reviewPayload.bourbon_id}, options)
    }

}
