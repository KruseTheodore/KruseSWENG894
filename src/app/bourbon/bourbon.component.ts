import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth/shared/auth.service';
import { Bourbon } from '../bourbon';
import { BourbonService } from '../bourbon.service';
import { Profile } from '../profile';
import { ProfileService } from '../profile.service';
import { Review } from '../review';

@Component({
  selector: 'app-bourbon',
  templateUrl: './bourbon.component.html',
  styleUrls: ['./bourbon.component.css']
})
export class BourbonComponent implements OnInit {
  public bourbons: Bourbon[];
  public search: Boolean;
  searchForm: FormGroup;
  public reset: Boolean;
  public noMatch: Boolean;
  public storedProfile: string;
  public profile: Profile;
  public hasBourbons: Boolean;
  public reviews: Review[];
  public hasReviewed: Boolean;
  public toRemove: string[] = [];
  public toDistilIncrease: string[] = [];
  public toBourbonIncrease: string[] = [];
  public dislikedBourbon: string[] = [];
  public similarProfiles: string[] = [];
  public similarReviews: Review[] = [];


  constructor(private bourbonService: BourbonService, private authService: AuthService, private profileService: ProfileService) { }

  ngOnInit() {
    this.storedProfile = this.authService.getUsername();
    this.reset = false;
    this.noMatch = false;
    this.getBourbons();
  }

  public getBourbons(): void {
    this.bourbonService.getBourbons().subscribe(
      (response: Bourbon[]) => {
        this.bourbons = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
      );

  }

  sortBourbonsRating(){
    var len = this.bourbons.length;
    var i;
    var j;
    var stop;
    for (i=0; i < len; i++){
      for (j=0, stop=len-i; j < stop; j++){
        if (this.bourbons[j]?.rating != undefined && typeof this.bourbons[j+1]?.rating != undefined){
          if (this.bourbons[j]?.rating < this.bourbons[j+1]?.rating){
            this.swap(this.bourbons, j, j+1);
          };
        }
        else if (this.bourbons[j+1]?.rating != undefined){
          this.swap(this.bourbons, j, j+1);
        }
        
      };
    };
  }

  sortBourbonsProof(){
    var len = this.bourbons.length;
    var i;
    var j;
    var stop;
    for (i=0; i < len; i++){
      for (j=0, stop=len-i; j < stop; j++){
          if (this.bourbons[j]?.proof < this.bourbons[j+1]?.proof){
            this.swap(this.bourbons, j, j+1);
          };
        
      };
    };
  }

  sortBourbonsName(){
    var len = this.bourbons.length;
    var i;
    var j;
    var stop;
    for (i=0; i < len; i++){
      for (j=0, stop=len-i; j < stop; j++){
          if (this.bourbons[j]?.name > this.bourbons[j+1]?.name){
            this.swap(this.bourbons, j, j+1);
          };
        
      };
    };
  }

  sortBourbonsDistil(){
    var len = this.bourbons.length;
    var i;
    var j;
    var stop;
    for (i=0; i < len; i++){
      for (j=0, stop=len-i; j < stop; j++){
          if (this.bourbons[j]?.distil > this.bourbons[j+1]?.distil){
            this.swap(this.bourbons, j, j+1);
          };

        
      };
    };
  }

  swap(sortedBourbons: Bourbon[], firstIndex: number, secondIndex: number){
    var temp = sortedBourbons[firstIndex];
    sortedBourbons[firstIndex] = sortedBourbons[secondIndex];
    sortedBourbons[secondIndex] = temp;
    }

    createSearchForm(){
      this.searchForm = new FormGroup({
        text1: new FormControl(),
        proof1: new FormControl(),
        proof2: new FormControl()
      });
      this.search = true;
    }

    searchBourbons(){
      var min: number;
      var max: number;
      var match: string;
      this.noMatch = false;
      this.search = false;
      if (this.searchForm.get('proof1')?.value){
        min = this.searchForm.get('proof1')?.value;
      } 
      else{
        min = 0;
      }
      if (this.searchForm.get('proof2')?.value){
        max = this.searchForm.get('proof2')?.value;
      } 
      else{
        max = 200;
      }
      if(this.searchForm.get('proof2')?.value || this.searchForm.get('proof1')?.value){
        this.getProofRange(min, max);
      }
      
      if (this.searchForm.get('text1')?.value){
        match = this.searchForm.get('text1')?.value;
        this.noMatch = this.getMatches(match);
        if (this.noMatch){
          this.getClosestMatch(match);
        }
      } 

      this.reset = true;
      
    }

    getProofRange(min: number, max: number){
      var len = this.bourbons.length;
      var i = 0;
      while (i < len){
        if (this.bourbons[i]?.proof < min){
          this.bourbons.splice(i, 1);
        }
        else if (this.bourbons[i]?.proof > max){
          this.bourbons.splice(i, 1);
        }
        else{
          ++i;
        }
      };
    }

    getMatches(match: string): Boolean{
      var temp: Bourbon[];
      temp = JSON.parse(JSON.stringify(this.bourbons));
      var len = temp.length;
      var i = 0;
      while (i < len){
        if (temp[i]?.name.search(new RegExp(match, "i")) == -1 && temp[i]?.distil.search(new RegExp(match, "i")) == -1){
          temp.splice(i, 1);
        }
        else{
          ++i;
        }
      };
      if (temp.length != 0){
        this.bourbons = temp;
        return false;
      }
      else{
        return true;
      }
    }

    getClosestMatch(match: string){
      var len = this.bourbons.length;
      var i = 0;
      var strLen1 = match.length;
      var strLen2 = 0;
      var matrix: number[][] = [];
      var subCost = 0;
      var rank: number[] = [];
      var minIndex: number;
      var closeBourbons: Bourbon[] = [];

      while (i < len){
        strLen2 = this.bourbons[i].name.length;
        matrix = this.createMatrix(match, this.bourbons[i].name);
        for(var j = 0; j < strLen1 + 1; j++){
          for(var k = 0; k < strLen2 + 1; k++){
            if (match.charAt(j-1).toLowerCase() == this.bourbons[i].name.charAt(k-1).toLowerCase()){
              subCost = 0;
            }
            else{
              subCost = 1;
            }
            if (j != 0 && k != 0){
              matrix[j][k] = Math.min(matrix[j-1][k] + 1, matrix[j][k - 1] + 1, matrix[j-1][k-1] + subCost);
            }
            else if (k != 0){
              matrix[j][k] = matrix[j][k - 1] + 1;
            }
            else if (j != 0){
              matrix[j][k] = matrix[j-1][k] + 1;
            }
            else{
              matrix[j][k] = 0;
            }

          }
        }
        rank[i] = matrix[strLen1][strLen2];

        i++;

      };

      for(var l = 0; l < 5; l++){
        minIndex = rank.indexOf(Math.min(...rank));
        closeBourbons[l] = this.bourbons[minIndex];
        this.bourbons.splice(minIndex, 1);
      }

      this.bourbons = closeBourbons;

    }

    createMatrix(match: string, check: string): number[][]{
      var strLen1 = match.length;
      var strLen2 = check.length;
      var matrix: number[][] = [];
      for(var j = 0; j < strLen1 + 1; j++){
        matrix[j] = [];
        for(var k = 0; k < strLen2 + 1; k++){
          matrix[j][k] = 0;
        }
      }

      return matrix;

    }

    getRecommended(){
      this.getOwned();

      
      
    }

    getOwned(){
      this.profileService.getProfileByName(this.storedProfile).subscribe(
        (response: Profile)=> {
          this.profile = response;
          if(this.profile.bourbon_ids != undefined && this.profile.bourbon_ids.length != 0){
            this.hasBourbons = true;
          }
          else{
            this.hasBourbons = false;
          }
          
     
      if (this.hasBourbons){
        this.toRemove =this.profile.bourbon_ids;
      }
      this.getReviewed();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
      
      
    }

    getReviewed(){
      this.profileService.getReviewsOnProfile(this.storedProfile).subscribe(
        (response: Review[])=> {
          this.reviews = response;
          if(this.reviews != undefined && this.reviews.length != 0){
            this.hasReviewed = true;
          }
          else{
            this.hasReviewed = false;
          }
          

      if (this.hasReviewed){
        this.reviews.forEach(review => {
          if(!this.toRemove.includes(review.bourbon_id)){
            this.toRemove.push(review.bourbon_id)
          }          
        }
        )
          
      }
      if (this.hasReviewed){
        this.modifyRatings();
      }
      
      
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
      
    }

    removeOwned(){
      var len = this.bourbons.length;
      var i = 0;
      while (i < len){
        if(this.toRemove.includes(this.bourbons[i]?.name)){
          this.bourbons.splice(i, 1);
        }
        else{
          ++i;
        }
          
      };
      
      
    }

    modifyRatings(){
      this.getHighRatings();
      this.getLowRatings();
      var wait = new Promise<void>((resolve) => {
        this.dislikedBourbon.forEach(async (badBourbon, i) => {
          await this.getProfilesWhoDisliked(badBourbon).then(() => {
           this.similarProfiles.forEach(async (name, j) => {
             await this.getReviewsFromSimilar(name).then(() => {
              if ((i+1)*(j+1) == this.dislikedBourbon.length * this.similarProfiles.length){
                resolve();
              }  
             })
           })
         })
       })
       
      });
      wait.then(() => {
        this.removeOwned();
        var i = 0;
        var len = this.bourbons.length;
        while (i < len){
            if(this.toBourbonIncrease.includes(this.bourbons[i].name)){
              this.bourbons[i].rating = this.bourbons[i].rating * 1.1;
            }
            if(this.toDistilIncrease.includes(this.bourbons[i].distil)){
              this.bourbons[i].rating = this.bourbons[i].rating * 1.1;
            }
            ++i;
        };

        this.sortBourbonsRating();
        this.topTen();

        i = 0;
        len = this.bourbons.length;
        while (i < len){
            if(this.toBourbonIncrease.includes(this.bourbons[i].name)){
              this.bourbons[i].rating = this.bourbons[i].rating / 1.1;
            }
            if(this.toDistilIncrease.includes(this.bourbons[i].distil)){
              this.bourbons[i].rating = this.bourbons[i].rating / 1.1;
            }
            ++i;
        };
      })

    }

    getHighRatings(){
      var len = this.bourbons.length;
      var i = 0;
     
      this.reviews.forEach(review => {
        if(review.rating >= 4.0){
          while (i < len){
            if(this.bourbons[i]?.name == review.bourbon_id && !this.toDistilIncrease.includes(this.bourbons[i]?.distil)){
              this.toDistilIncrease.push(this.bourbons[i]?.distil)
              i = len - 1;
            }
              ++i;
          };
          
          i = 0;
            
        }          
      })
      
    }

    getLowRatings(){
      var len = this.bourbons.length;
      var i = 0;
      
     
      this.reviews.forEach(review => {
        if(review.rating <= 2.0){
          while (i < len){
            if(this.bourbons[i]?.name == review.bourbon_id && !this.dislikedBourbon.includes(this.bourbons[i]?.name)){
              this.dislikedBourbon.push(this.bourbons[i]?.name)
              i = len - 1;
            }
              ++i;
          };
          
          i = 0;
            
        }          
      })

    }

    async getProfilesWhoDisliked(badBourbon: string){
      const badBourbonReviews = await this.bourbonService.getReviewsOnBourbon(badBourbon).toPromise();
        if (badBourbonReviews != undefined){
          badBourbonReviews.forEach(badReview => {
            if (badReview.rating <= 2.0 && badReview.profile_id != this.storedProfile){
              this.similarProfiles.push(badReview.profile_id)
            }
          })
        }

        /** 
        await this.bourbonService.getReviewsOnBourbon(badBourbon).subscribe(
          (response: Review[])=> {
            response.forEach(badReview => {
              if (badReview.rating <= 2.0){
                this.similarProfiles.push(badReview.profile_id)
              }
              
            })
            console.log(this.similarProfiles)
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
        */
    }

    async getReviewsFromSimilar(name: string){
      const bourbonReviews = await this.profileService.getReviewsOnProfile(name).toPromise();
      if (bourbonReviews != undefined){
        bourbonReviews.forEach(goodReview => {
          if (goodReview.rating >= 4.0){
            this.toBourbonIncrease.push(goodReview.bourbon_id)
          }
        })
      }

    }


    topTen(){
      var i = 5;
      while (i < this.bourbons.length){
        this.bourbons.splice(i, 1);
      }

    }


    

}
