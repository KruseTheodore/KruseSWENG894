import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/shared/auth.service';
import { Bourbon } from '../bourbon';
import { BourbonService } from '../bourbon.service';
import { Review } from '../review';

@Component({
  selector: 'app-single-bourbon',
  templateUrl: './single-bourbon.component.html',
  styleUrls: ['./single-bourbon.component.css']
})
export class SingleBourbonComponent implements OnInit {

  bourbonName: string;
  bourbon: Bourbon;
  reviews: Review[];
  public isLoggedIn: boolean;

  constructor(private activatedRoute: ActivatedRoute,
    private bourbonService: BourbonService, private authService: AuthService) { }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.queryParamMap.get('name') != null){
      this.bourbonName = String(this.activatedRoute.snapshot.queryParamMap.get('name'));
    }
    this.isLoggedIn = this.authService.isLoggedIn();

    this.getBourbon();
    this.getReviewsForBourbon();

  }

  getBourbon(){
    this.bourbonService.getBourbonByName(this.bourbonName).subscribe((response: Bourbon) => {
      this.bourbon = response;
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
    );
  }

  getReviewsForBourbon(){
    this.bourbonService.getReviewsOnBourbon(this.bourbonName).subscribe(
      (response: Review[]) => {
        this.reviews = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
      );
  }



}
