import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  parseServerResponseIntoArray(response): Array<any> {
    let exercises = [];
    for (let key in response) {
      exercises.push(response[key]);
    }
    return exercises;
  }
}
