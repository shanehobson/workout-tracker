import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyPartsGraphComponent } from './body-parts-graph.component';

describe('BodyPartsGraphComponent', () => {
  let component: BodyPartsGraphComponent;
  let fixture: ComponentFixture<BodyPartsGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyPartsGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyPartsGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
