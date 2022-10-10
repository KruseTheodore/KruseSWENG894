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
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  getBourbonsOnProfile(){

  }

}
