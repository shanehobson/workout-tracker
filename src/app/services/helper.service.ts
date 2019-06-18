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

  filterTopXItems(items: Array<string>, amounts: Array<number>, numberToFilter: number): { items: Array<string>, amounts: Array<number>} {
    const itemsWithAmount = items.map((item, i) => {
      return { item, amount: amounts[i] };
    });

    const sortedArray = itemsWithAmount.sort((a, b) => {
      if (a.amount > b.amount) {
        return -1;
      } else {
        return 1;
      }
    });

    const topXArray = sortedArray.slice(0, numberToFilter);

    items = topXArray.map(el => el.item);
    amounts = topXArray.map(el => el.amount);
    return { items, amounts };
  }

  arraysAreEqual(array1: Array<string | number>, array2:  Array<string | number>) : boolean {
    if (array1.length !== array2.length) { return false; }

    let equal = true;
    for (let i = 0; i < array1.length && equal === true; i++) {
      if (array1[i] !== array2[i]) {
        equal = false;
      }
    }

    return equal;
  }

  getPercentage(item, data): string {
    if (!data) { return ''; }

    let total = 0;
    for (let key in data) {
      total += data[key];
    }

    const fraction = item['value'] / total;
    if (fraction > .1) {
      return `${Math.round(fraction * 100).toString()}%`;
    } else {
      return '';
    }
  }
}
