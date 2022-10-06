import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBourbonComponent } from './new-bourbon.component';

describe('NewBourbonComponent', () => {
  let component: NewBourbonComponent;
  let fixture: ComponentFixture<NewBourbonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewBourbonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewBourbonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
