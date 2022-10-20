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
  public noMatch: Boolean;

  constructor(private bourbonService: BourbonService) { }

  ngOnInit() {
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


    

}
