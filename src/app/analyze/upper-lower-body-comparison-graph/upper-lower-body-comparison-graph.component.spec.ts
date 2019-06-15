import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpperLowerBodyComparisonGraphComponent } from './upper-lower-body-comparison-graph.component';

describe('UpperLowerBodyComparisonGraphComponent', () => {
  let component: UpperLowerBodyComparisonGraphComponent;
  let fixture: ComponentFixture<UpperLowerBodyComparisonGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpperLowerBodyComparisonGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpperLowerBodyComparisonGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
