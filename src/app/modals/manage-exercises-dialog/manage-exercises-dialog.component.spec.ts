import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageExercisesDialogComponent } from './manage-exercises-dialog.component';

describe('ManageExercisesDialogComponent', () => {
  let component: ManageExercisesDialogComponent;
  let fixture: ComponentFixture<ManageExercisesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageExercisesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageExercisesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
