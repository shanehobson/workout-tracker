import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-manage-exercises-dialog',
  templateUrl: './manage-exercises-dialog.component.html',
  styleUrls: ['./manage-exercises-dialog.component.scss']
})
export class ManageExercisesDialogComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
  ) {
    
  }

  ngOnInit() {

  }

}
