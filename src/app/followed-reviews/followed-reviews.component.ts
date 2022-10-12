import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/shared/auth.service';
import { Profile } from '../profile';
import { ProfileService } from '../profile.service';
import { Review } from '../review';

@Component({
  selector: 'app-followed-reviews',
  templateUrl: './followed-reviews.component.html',
  styleUrls: ['./followed-reviews.component.css']
})
export class FollowedReviewsComponent implements OnInit {
  
  public profile: Profile;
  public profileName: string;
  public followedNames: string[];
  public reviews: Review[];
  public hasFollowed: Boolean;
  public hasReviewed: Boolean;

  constructor(private profileService: ProfileService, private authService: AuthService) { }

  ngOnInit(): void {
    this.reviews = [];
    this.profileName = this.authService.getUsername();
    this.getProfile();
  }

  getProfile(){
    this.profileService.getProfileByName(this.profileName).subscribe(
      (response: Profile)=> {
        this.profile = response;
        if(this.profile.followed_names != undefined && this.profile.followed_names.length != 0){
          this.hasFollowed = true;
        }
        else{
          this.hasFollowed = false;
        }
        if(this.hasFollowed){
          this.getReviewsOnProflie();
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  getReviewsOnProflie(){
    this.profile.followed_names.forEach(element => {
      this.profileService.getReviewsOnProfile(element).subscribe(
        (response: Review[])=> {
          if(response != undefined && response.length != 0){
            this.hasReviewed = true;
          }
          else{
            this.hasReviewed = false;
          }
          if(this.hasReviewed){
            this.reviews = this.reviews.concat(response);
          }
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    });
    
  }

}
