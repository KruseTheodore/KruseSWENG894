import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AuthService } from '../auth/shared/auth.service';
import { Bourbon } from '../bourbon';
import { BourbonService } from '../bourbon.service';

import { BourbonComponent } from './bourbon.component';

describe('BourbonComponent', () => {
  let component: BourbonComponent;
  let fixture: ComponentFixture<BourbonComponent>;
  let bourbonService: BourbonService
  const authService = {getUsername: () => 'test'} as AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers:[BourbonService, {provide: AuthService, useValue: authService}],
      declarations: [ BourbonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BourbonComponent);
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

  it('should sort by proof', () => {
    let bourbons: Bourbon[];
    bourbons = [
      {name: 'tastName', distil: 'testDistil', proof: 100.0, rating: 4.0},
      {name: 'tastName1', distil: 'testDistil1', proof: 101.0, rating: 3.0},
      {name: 'tastName2', distil: 'testDistil2', proof: 102.0, rating: 2.0}
    ]
    component.bourbons = bourbons;
    component.sortBourbonsProof();
    expect(component.bourbons).toEqual([
      {name: 'tastName2', distil: 'testDistil2', proof: 102.0, rating: 2.0},
      {name: 'tastName1', distil: 'testDistil1', proof: 101.0, rating: 3.0},
      {name: 'tastName', distil: 'testDistil', proof: 100.0, rating: 4.0}
    ])
  });

  it('should sort by name', () => {
    let bourbons: Bourbon[];
    bourbons = [
      {name: 'tastName', distil: 'testDistil', proof: 100.0, rating: 4.0},
      {name: 'btastName1', distil: 'testDistil1', proof: 101.0, rating: 3.0},
      {name: 'atastName2', distil: 'testDistil2', proof: 102.0, rating: 2.0}
    ]
    component.bourbons = bourbons;
    component.sortBourbonsName();
    expect(component.bourbons).toEqual([
      {name: 'atastName2', distil: 'testDistil2', proof: 102.0, rating: 2.0},
      {name: 'btastName1', distil: 'testDistil1', proof: 101.0, rating: 3.0},
      {name: 'tastName', distil: 'testDistil', proof: 100.0, rating: 4.0}
    ])
  });

  it('should sort by distillery', () => {
    let bourbons: Bourbon[];
    bourbons = [
      {name: 'tastName', distil: 'testDistil', proof: 100.0, rating: 4.0},
      {name: 'tastName1', distil: 'btestDistil1', proof: 101.0, rating: 3.0},
      {name: 'tastName2', distil: 'atestDistil2', proof: 102.0, rating: 2.0}
    ]
    component.bourbons = bourbons;
    component.sortBourbonsDistil();
    expect(component.bourbons).toEqual([
      {name: 'tastName2', distil: 'atestDistil2', proof: 102.0, rating: 2.0},
      {name: 'tastName1', distil: 'btestDistil1', proof: 101.0, rating: 3.0},
      {name: 'tastName', distil: 'testDistil', proof: 100.0, rating: 4.0}
    ])
  });

  it('should createSearchForm', () => {
    component.createSearchForm();
    expect(component.createSearchForm).toBeTruthy();
  });

  it('should searchBourbons proof range', () => {
    component.createSearchForm();
    let newSpy = spyOn(component, 'getProofRange');
    component.searchForm.controls['proof1'].setValue(100.0);
    component.searchForm.controls['proof2'].setValue(101.0);
    component.searchBourbons();
    expect(newSpy).toHaveBeenCalledWith(100.0, 101.0);
  });

  it('should searchBourbons matches', () => {
    component.createSearchForm();
    let newSpy = spyOn(component, 'getMatches');
    component.searchForm.controls['text1'].setValue("Blantons");
    component.searchBourbons();
    expect(newSpy).toHaveBeenCalledWith("Blantons");
  });

  it('should searchBourbons closest match', () => {
    component.createSearchForm();
    let newSpy = spyOn(component, 'getClosestMatch');
    let newSpy1 = spyOn(component, 'getMatches').and.returnValue(true);
    component.searchForm.controls['text1'].setValue("test");
    component.searchBourbons();
    expect(newSpy).toHaveBeenCalledWith("test");
  });

  it('should getProofRange', () => {
    let bourbons: Bourbon[];
    bourbons = [
      {name: 'tastName', distil: 'testDistil', proof: 100.0, rating: 4.0},
      {name: 'tastName1', distil: 'testDistil1', proof: 95.0, rating: 3.0},
      {name: 'tastName2', distil: 'testDistil2', proof: 110.0, rating: 2.0}
    ]
    component.bourbons = bourbons;
    component.getProofRange(96.0, 101.0);
    expect(component.bourbons).toEqual([
      {name: 'tastName', distil: 'testDistil', proof: 100.0, rating: 4.0}
    ])
  });

  it('should getMatches', () => {
    let bourbons: Bourbon[];
    bourbons = [
      {name: 'tastName', distil: 'testDistil', proof: 100.0, rating: 4.0},
      {name: 'tastName1', distil: 'testDistil1', proof: 95.0, rating: 3.0},
      {name: 'tastName2', distil: 'testDistil2', proof: 110.0, rating: 2.0}
    ]
    component.bourbons = bourbons;
    let test = component.getMatches("tastName1");
    expect(component.bourbons).toEqual([
      {name: 'tastName1', distil: 'testDistil1', proof: 95.0, rating: 3.0}
    ])
    expect(test).toEqual(false);
  });

  it('should getNoMatches', () => {
    let bourbons: Bourbon[];
    bourbons = [
      {name: 'tastName', distil: 'testDistil', proof: 100.0, rating: 4.0},
      {name: 'tastName1', distil: 'testDistil1', proof: 95.0, rating: 3.0},
      {name: 'tastName2', distil: 'testDistil2', proof: 110.0, rating: 2.0}
    ]
    component.bourbons = bourbons;
    let test = component.getMatches("tastName10");
    expect(test).toEqual(true);
  });

  it('should createMatrix', () => {
    let test = component.createMatrix("tast", "Name");
    expect(test).toEqual([[0, 0, 0, 0, 0,], [0, 0, 0, 0, 0,], [0, 0, 0, 0, 0,], [0, 0, 0, 0, 0,], [0, 0, 0, 0, 0,]]);
  });

  it('should getClosestMatches', () => {
    let bourbons: Bourbon[];
    bourbons = [
      {name: 'tastName', distil: 'testDistil', proof: 100.0, rating: 4.0},
      {name: 'tastName1', distil: 'testDistil1', proof: 95.0, rating: 3.0},
      {name: 'tastName20', distil: 'testDistil2', proof: 110.0, rating: 2.0},
      {name: 'tastName2099', distil: 'testDistil2', proof: 110.0, rating: 2.0},
      {name: 'tastName209999', distil: 'testDistil2', proof: 110.0, rating: 2.0},
      {name: 'notevenclosebaby', distil: 'testDistil2', proof: 110.0, rating: 2.0}
    ]
    component.bourbons = bourbons;
    let newSpy1 = spyOn(component, 'getMatches').and.returnValue(true);
    component.getClosestMatch("test");
    expect(component.bourbons).toEqual([
      {name: 'tastName', distil: 'testDistil', proof: 100.0, rating: 4.0},
      {name: 'tastName1', distil: 'testDistil1', proof: 95.0, rating: 3.0},
      {name: 'tastName20', distil: 'testDistil2', proof: 110.0, rating: 2.0},
      {name: 'tastName2099', distil: 'testDistil2', proof: 110.0, rating: 2.0},
      {name: 'tastName209999', distil: 'testDistil2', proof: 110.0, rating: 2.0}
    ])
  });

  

});
