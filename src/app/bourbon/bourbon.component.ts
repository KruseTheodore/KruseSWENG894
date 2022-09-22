import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Bourbon } from '../bourbon';
import { BourbonService } from '../bourbon.service';

@Component({
  selector: 'app-bourbon',
  templateUrl: './bourbon.component.html',
  styleUrls: ['./bourbon.component.css']
})
export class BourbonComponent implements OnInit {
  public bourbons: Bourbon[];

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
