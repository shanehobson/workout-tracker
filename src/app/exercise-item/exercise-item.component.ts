import { Component, OnInit, Input } from '@angular/core';
import { Exercise } from '../../interfaces/Exercise';

@Component({
  selector: 'app-exercise-item',
  templateUrl: './exercise-item.component.html',
  styleUrls: ['./exercise-item.component.scss']
})
export class ExerciseItemComponent implements OnInit {

  @Input() exercise: Exercise;

  constructor() { }

  ngOnInit() {
    console.log(this.exercise);
  }

}
