import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Bourbon } from '../bourbon';
import { BourbonService } from '../bourbon.service';

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

  constructor(private bourbonService: BourbonService) { }

  ngOnInit() {
    this.reset = false;
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
        if (this.bourbons[j]?.proof != undefined && typeof this.bourbons[j+1]?.proof != undefined){
          if (this.bourbons[j]?.proof < this.bourbons[j+1]?.proof){
            this.swap(this.bourbons, j, j+1);
          };
        }
        else if (this.bourbons[j+1]?.proof != undefined){
          this.swap(this.bourbons, j, j+1);
        }
        
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
        if (this.bourbons[j]?.name != undefined && typeof this.bourbons[j+1]?.name != undefined){
          if (this.bourbons[j]?.name > this.bourbons[j+1]?.name){
            this.swap(this.bourbons, j, j+1);
          };
        }
        else if (this.bourbons[j+1]?.name != undefined){
          this.swap(this.bourbons, j, j+1);
        }
        
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
        if (this.bourbons[j]?.distil != undefined && typeof this.bourbons[j+1]?.distil != undefined){
          if (this.bourbons[j]?.distil > this.bourbons[j+1]?.distil){
            this.swap(this.bourbons, j, j+1);
          };
        }
        else if (this.bourbons[j+1]?.distil != undefined){
          this.swap(this.bourbons, j, j+1);
        }
        
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
      this.getProofRange(min, max);
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

    

}
