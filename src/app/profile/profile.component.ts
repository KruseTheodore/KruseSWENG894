import { Component, OnInit } from '@angular/core';
import { Profile } from '../profile';
import { ProfileService } from '../profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Review } from '../review';
import { Bourbon } from '../bourbon';

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

  constructor(private profileService: ProfileService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.queryParamMap.get('name') != null){
      this.profileName = String(this.activatedRoute.snapshot.queryParamMap.get('name'));
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

  getBourbonsOnProfile(){

  }

}
