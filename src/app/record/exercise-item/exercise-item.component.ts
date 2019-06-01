import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Exercise } from '../../../interfaces/Exercise';

@Component({
  selector: 'app-exercise-item',
  templateUrl: './exercise-item.component.html',
  styleUrls: ['./exercise-item.component.scss']
})
export class ExerciseItemComponent implements OnInit {

  @Input() exercise: Exercise;
  @Output() deleteExercise = new EventEmitter<Exercise>();
  @Output() editExercise = new EventEmitter<Exercise>();

  constructor() { }

  ngOnInit() {
    console.log(this.exercise);
    this.exercise['imageUrl'] = this.exercise.type === 'cardio' ? '../../assets/cardio.png' : '../../assets/logo-green.png';
  }

  onEditExercise() {
    this.editExercise.emit(this.exercise);
  }

  onDeleteExercise() {
    this.deleteExercise.emit(this.exercise);
  }

}
