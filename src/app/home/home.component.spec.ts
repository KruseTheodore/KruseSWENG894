import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Bourbon } from '../bourbon';
import { BourbonService } from '../bourbon.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let bourbonService: BourbonService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers:[BourbonService],
      declarations: [ HomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    bourbonService = TestBed.inject(BourbonService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get bourbons', () => {
    let bourbons: Bourbon[];
    bourbons = [
      {name: 'tastName', distil: 'testDistil', proof: 100.0, rating: 4.0}
    ]
    let newSpy = spyOn(bourbonService, 'getBourbons').and.returnValues(of(bourbons));
    component.getBourbons();
    expect(newSpy).toHaveBeenCalled();
  });

  it('should not get bourbons', () => {
    let newSpy = spyOn(bourbonService, 'getBourbons').and.returnValues(throwError(() => new Error("test")));
    component.getBourbons();
    expect(newSpy).toHaveBeenCalled();
  });

  it('should sort by rating', () => {
    let bourbons: Bourbon[];
    bourbons = [
      {name: 'tastName', distil: 'testDistil', proof: 100.0, rating: 1.0},
      {name: 'tastName1', distil: 'testDistil1', proof: 101.0, rating: 3.0},
      {name: 'tastName2', distil: 'testDistil2', proof: 102.0, rating: 4.0}
    ]
    component.bourbons = bourbons;
    component.sortBourbonsRating();
    expect(component.bourbons).toEqual([
      {name: 'tastName2', distil: 'testDistil2', proof: 102.0, rating: 4.0},
      {name: 'tastName1', distil: 'testDistil1', proof: 101.0, rating: 3.0},
      {name: 'tastName', distil: 'testDistil', proof: 100.0, rating: 1.0}
    ])
  });

});
