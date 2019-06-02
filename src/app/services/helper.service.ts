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

  shortenString(input: string, length: number): string {
    if (input.length > length) {
      return input.slice(0, length - 2) + '...';
    } else {
      return input;
    }
  }
}
