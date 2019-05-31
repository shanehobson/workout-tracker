import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearTrackerComponent } from './year-tracker.component';

describe('YearTrackerComponent', () => {
  let component: YearTrackerComponent;
  let fixture: ComponentFixture<YearTrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearTrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
