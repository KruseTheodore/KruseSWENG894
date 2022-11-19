import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Review } from '../review';
import { ReviewService } from '../review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  public reviews: Review[];


  constructor(private reviewService: ReviewService) { }

  ngOnInit(): void {
    this.getReviews();
  }

  public getReviews(): void {
    this.reviewService.getReviews().subscribe(
      (response: Review[]) => {
        this.reviews = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
      );
    }

    sortReviewsRating(){
      var len = this.reviews.length;
      var i;
      var j;
      var stop;
      for (i=0; i < len; i++){
        for (j=0, stop=len-i; j < stop; j++){
          if (this.reviews[j]?.rating != undefined && typeof this.reviews[j+1]?.rating != undefined){
            if (this.reviews[j]?.rating < this.reviews[j+1]?.rating){
              this.swap(this.reviews, j, j+1);
            };
          }
          else if (this.reviews[j+1]?.rating != undefined){
            this.swap(this.reviews, j, j+1);
          }
          
        };
      };
    }

    sortReviewsTaste(){
      var len = this.reviews.length;
      var i;
      var j;
      var stop;
      for (i=0; i < len; i++){
        for (j=0, stop=len-i; j < stop; j++){
          if (this.reviews[j]?.taste != undefined && typeof this.reviews[j+1]?.taste != undefined){
            if (this.reviews[j]?.taste < this.reviews[j+1]?.taste){
              this.swap(this.reviews, j, j+1);
            };
          }
          else if (this.reviews[j+1]?.taste != undefined){
            this.swap(this.reviews, j, j+1);
          }
          
        };
      };
    }

    sortReviewsNose(){
      var len = this.reviews.length;
      var i;
      var j;
      var stop;
      for (i=0; i < len; i++){
        for (j=0, stop=len-i; j < stop; j++){
          if (this.reviews[j]?.nose != undefined && typeof this.reviews[j+1]?.nose != undefined){
            if (this.reviews[j]?.nose < this.reviews[j+1]?.nose){
              this.swap(this.reviews, j, j+1);
            };
          }
          else if (this.reviews[j+1]?.nose != undefined){
            this.swap(this.reviews, j, j+1);
          }
          
        };
      };
    }

    sortReviewsMouthfeel(){
      var len = this.reviews.length;
      var i;
      var j;
      var stop;
      for (i=0; i < len; i++){
        for (j=0, stop=len-i; j < stop; j++){
          if (this.reviews[j]?.mouthfeel != undefined && typeof this.reviews[j+1]?.mouthfeel != undefined){
            if (this.reviews[j]?.mouthfeel < this.reviews[j+1]?.mouthfeel){
              this.swap(this.reviews, j, j+1);
            };
          }
          else if (this.reviews[j+1]?.mouthfeel != undefined){
            this.swap(this.reviews, j, j+1);
          }
          
        };
      };
    }

    sortReviewsValue(){
      var len = this.reviews.length;
      var i;
      var j;
      var stop;
      for (i=0; i < len; i++){
        for (j=0, stop=len-i; j < stop; j++){
          if (this.reviews[j]?.value != undefined && typeof this.reviews[j+1]?.value != undefined){
            if (this.reviews[j]?.value < this.reviews[j+1]?.value){
              this.swap(this.reviews, j, j+1);
            };
          }
          else if (this.reviews[j+1]?.value != undefined){
            this.swap(this.reviews, j, j+1);
          }
          
        };
      };
    }

    sortReviewsAvail(){
      var len = this.reviews.length;
      var i;
      var j;
      var stop;
      for (i=0; i < len; i++){
        for (j=0, stop=len-i; j < stop; j++){
          if (this.reviews[j]?.availability != undefined && typeof this.reviews[j+1]?.availability != undefined){
            if (this.reviews[j]?.availability < this.reviews[j+1]?.availability){
              this.swap(this.reviews, j, j+1);
            };
          }
          else if (this.reviews[j+1]?.availability != undefined){
            this.swap(this.reviews, j, j+1);
          }
          
        };
      };
    }

    swap(sortedReviews: Review[], firstIndex: number, secondIndex: number){
      var temp = sortedReviews[firstIndex];
      sortedReviews[firstIndex] = sortedReviews[secondIndex];
      sortedReviews[secondIndex] = temp;
      }
  


}
