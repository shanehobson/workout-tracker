import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Globals } from '../globals';
import { User } from '../../interfaces/User';
import { Exercise } from '../../interfaces/Exercise';
import { UserData } from '../../interfaces/UserData';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  
  addExerciseUrl = `${this.globals.serverUrl}/exercises`;
  getExercisesUrl = `${this.globals.serverUrl}/exercises`;
  updateExerciseUrl = `${this.globals.serverUrl}/exercises`;
  deleteExercisesUrl = `${this.globals.serverUrl}/exercises`;
  getExercisesByDateRangeUrl = `${this.globals.serverUrl}/exercisesByDateRange?startDate=`;
  getUserDataUrl = `${this.globals.serverUrl}/userData`;
  updateUserDataUrl = `${this.globals.serverUrl}/userData`;

  constructor(
    private http: HttpClient,
    private router: Router,
    private globals: Globals,
    private authService: AuthService
  ) { }

  addExercise(exercise: Exercise) {
    return new Promise((resolve, reject) => {
      this.http.post(this.addExerciseUrl, exercise, this.getRequestOptions())
        .subscribe(response => {
          resolve(response);
        }, err => {
          reject(err);
        });
    });
  }

  getExercises() {
    return new Promise((resolve, reject) => {
      this.http.get(this.getExercisesUrl, this.getRequestOptions())
        .subscribe(response => {
          resolve(response);
        }, err => {
          reject(err);
        });
    });
  }

  getExerciseById(id: string) {
    return new Promise((resolve, reject) => {
      this.http.get(`this.getExercisesUrl/${id}`, this.getRequestOptions())
        .subscribe(response => {
          resolve(response);
        }, err => {
          reject(err);
        });
    });
  }

  getExercisesByDateRange(startDate: string, endDate: string) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.getExercisesByDateRangeUrl}${startDate}&endDate=${endDate}`, this.getRequestOptions())
        .subscribe(response => {
          resolve(response);
        }, err => {
          reject(err);
        });
    });
  }

  updateExercise(id: string, updates) {
    return new Promise((resolve, reject) => {
      this.http.patch(`${this.updateExerciseUrl}/${id}`, updates, this.getRequestOptions())
        .subscribe(response => {
          resolve(response);
        }, err => {
          reject(err);
        });
    });
  }

  deleteExercise(id: string) {
    return new Promise((resolve, reject) => {
      this.http.delete(`${this.deleteExercisesUrl}/${id}`, this.getRequestOptions())
        .subscribe(response => {
          resolve(response);
        }, err => {
          reject(err);
        });
    });
  }

  getUserData() {
    return new Promise((resolve, reject) => {
      this.http.get(this.getUserDataUrl, this.getRequestOptions())
        .subscribe(response => {
          resolve(response);
        }, err => {
          reject(err);
        });
    });
  }

  updateUserData(updates) {
    return new Promise((resolve, reject) => {
      this.http.patch(this.getUserDataUrl, updates, this.getRequestOptions())
        .subscribe(response => {
          resolve(response);
        }, err => {
          reject(err);
        });
    });
  }

  // Auth Headers
  getRequestOptions() {
    return {
        headers: this.getHeadersWithAuthToken()                                                                                                                                                                               
    };
  }

  getHeadersWithAuthToken() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    });
  }

}
