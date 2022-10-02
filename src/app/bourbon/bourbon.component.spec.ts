import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BourbonComponent } from './bourbon.component';

describe('BourbonComponent', () => {
  let component: BourbonComponent;
  let fixture: ComponentFixture<BourbonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ BourbonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BourbonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
