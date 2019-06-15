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

    const topTenArray = sortedArray.slice(0, numberToFilter);

    items = topTenArray.map(el => el.item);
    amounts = topTenArray.map(el => el.amount);
    return { items, amounts };
  }

}
