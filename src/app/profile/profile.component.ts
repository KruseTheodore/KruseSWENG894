import { Component, OnInit } from '@angular/core';
import { Profile } from '../profile';
import { ProfileService } from '../profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Review } from '../review';
import { Bourbon } from '../bourbon';
import { AuthService } from '../auth/shared/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public profile: Profile;
  public profileName: string;
  public reviews: Review[];
  public bourbons: Bourbon[];
  public hasBourbons: Boolean;
  public hasFollowed: Boolean;
  public hasReviewed: Boolean;
  public yourProfile: boolean;
  public storedProfile: string;
  public profileFollowed: Boolean;

  constructor(private profileService: ProfileService, private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthService, private toastr: ToastrService) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.storedProfile = this.authService.getUsername();
    if(this.activatedRoute.snapshot.queryParamMap.get('name') != null){
      this.profileName = String(this.activatedRoute.snapshot.queryParamMap.get('name'));
    }
    if(this.profileName == this.storedProfile){
      this.yourProfile = true;
    }
    else{
      this.yourProfile = false;
    }
    this.getProfile();
    this.getReviewsOnProflie();
  }

  getProfile(){
    this.profileService.getProfileByName(this.profileName).subscribe(
      (response: Profile)=> {
        this.profile = response;
        if(this.profile.bourbon_ids != undefined && this.profile.bourbon_ids.length != 0){
          this.hasBourbons = true;
        }
        else{
          this.hasBourbons = false;
        }
        if(this.profile.followed_names != undefined && this.profile.followed_names.length != 0){
          this.hasFollowed = true;
        }
        else{
          this.hasFollowed = false;
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

    if(!this.yourProfile){
      this.profileService.getProfileByName(this.storedProfile).subscribe(
        (response: Profile)=> {
          if(response.followed_names.includes(this.profileName)){
            this.profileFollowed = true;
          }
          else{
            this.profileFollowed = false;
          }
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }

  getReviewsOnProflie(){
    this.profileService.getReviewsOnProfile(this.profileName).subscribe(
      (response: Review[])=> {
        this.reviews = response;
        if(this.reviews != undefined && this.reviews.length != 0){
          this.hasReviewed = true;
        }
        else{
          this.hasReviewed = false;
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  followUser(){
    this.profileService.followUser(this.storedProfile, this.profileName).subscribe(data => {
      this.toastr.success('User Followed');
      this.ngOnInit();
    }, () => {
      this.toastr.error('Failed to follow please refresh and try agian.');
    });
  }

  unfollowUser(){
    this.profileService.unfollowUser(this.storedProfile, this.profileName).subscribe(data => {
      this.toastr.success('User Unfollowed');
      this.ngOnInit();
    }, () => {
      this.toastr.error('Failed to unfollow please refresh and try agian.');
    });
  }

}
