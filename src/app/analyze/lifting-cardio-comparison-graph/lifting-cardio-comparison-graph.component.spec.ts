import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiftingCardioComparisonGraphComponent } from './lifting-cardio-comparison-graph.component';

describe('LiftingCardioComparisonGraphComponent', () => {
  let component: LiftingCardioComparisonGraphComponent;
  let fixture: ComponentFixture<LiftingCardioComparisonGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiftingCardioComparisonGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiftingCardioComparisonGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
