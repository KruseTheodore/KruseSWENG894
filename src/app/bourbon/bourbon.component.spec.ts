import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Bourbon } from '../bourbon';
import { BourbonService } from '../bourbon.service';

import { BourbonComponent } from './bourbon.component';

describe('BourbonComponent', () => {
  let component: BourbonComponent;
  let fixture: ComponentFixture<BourbonComponent>;
  let bourbonService: BourbonService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers:[BourbonService],
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

});
