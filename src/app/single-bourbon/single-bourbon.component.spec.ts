import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleBourbonComponent } from './single-bourbon.component';

describe('SingleBourbonComponent', () => {
  let component: SingleBourbonComponent;
  let fixture: ComponentFixture<SingleBourbonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleBourbonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleBourbonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
