import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Bourbon } from './bourbon';
import { BourbonService } from './bourbon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public bourbons: Bourbon[] | undefined;

  constructor(private bourbonService: BourbonService) { }

  ngOnInit() {
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
  



}
