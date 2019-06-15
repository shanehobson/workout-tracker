import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercisesGraphComponent } from './exercises-graph.component';

describe('ExercisesGraphComponent', () => {
  let component: ExercisesGraphComponent;
  let fixture: ComponentFixture<ExercisesGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExercisesGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExercisesGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
