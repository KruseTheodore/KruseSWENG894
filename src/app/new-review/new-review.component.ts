import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewService } from '../review.service';
import { ReviewPayload } from './review.payload';

@Component({
  selector: 'app-new-review',
  templateUrl: './new-review.component.html',
  styleUrls: ['./new-review.component.css']
})
export class NewReviewComponent implements OnInit {


  reviewPayload: ReviewPayload;
  reviewForm: FormGroup;
  bourbon: string;

  constructor(private activatedRoute: ActivatedRoute,
    private reviewService: ReviewService,
    private router: Router) {
      this.reviewPayload = {
        name: '',
        rating: NaN,
        taste: NaN,
        nose: NaN,
        mouthfeel: NaN,
        value: NaN,
        availability: NaN,
        content: '',
        profile_id: '',
        bourbon_id: '',
      };
     }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.queryParamMap.get('name') != null){
      this.bourbon = String(this.activatedRoute.snapshot.queryParamMap.get('name'));
    }

    this.reviewForm = new FormGroup({
      name: new FormControl('', Validators.required),
      rating: new FormControl('', Validators.required),
      taste: new FormControl(''),
      nose: new FormControl(''),
      mouthfeel: new FormControl(''),
      value: new FormControl(''),
      availability: new FormControl(''),
      content: new FormControl('')
    });

  }

  onSubmit(){

    if(this.reviewForm.valid){
      this.newReview();
    }
    else{
      alert("Please fill out Review Name and Overall Rating and try submitting again.");
    }

  }

  newReview(){
    this.reviewPayload.bourbon_id = this.bourbon;
    this.reviewPayload.name = this.reviewForm.get('name')?.value;
    this.reviewPayload.rating = this.reviewForm.get('rating')?.value;
    this.reviewPayload.taste = this.reviewForm.get('taste')?.value;
    this.reviewPayload.nose = this.reviewForm.get('nose')?.value;
    this.reviewPayload.mouthfeel = this.reviewForm.get('mouthfeel')?.value;
    this.reviewPayload.value = this.reviewForm.get('value')?.value;
    this.reviewPayload.availability = this.reviewForm.get('availability')?.value;
    this.reviewPayload.content = this.reviewForm.get('content')?.value;

    this.reviewService.newReview(this.reviewPayload).subscribe();
    
  }

}
