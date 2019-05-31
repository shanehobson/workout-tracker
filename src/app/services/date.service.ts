import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class DateService {

  startDate;
  endDate;

  date = new Date();
  day = (this.date.getDate() + 1).toString();
  todayNum = this.date.getDate();
  tomorrowNum = (this.date.getDate() + 1);
  yesterdayNum = (this.date.getDate() - 1);
  thisMonth = this.date.getMonth() + 1;
  thisMonthNum = this.date.getMonth() + 1;
  yearNum = this.date.getFullYear();
  lastWeekNum = (this.date.getDate() - 6);
  lastMonthNum = this.getLastMonthNumber();


  todayWithTime = this.yearNum + '-' +  ((this.date.getMonth() + 1) < 10 ? '0' + (this.date.getMonth() + 1).toString() : (this.date.getMonth() + 1).toString())  + '-' + ((this.todayNum < 10) ? '0' + this.todayNum.toString() : this.todayNum.toString() + 'T' + this.date.getHours());
  today = this.yearNum + '-' +  ((this.date.getMonth() + 1) < 10 ? '0' + (this.date.getMonth() + 1).toString() : (this.date.getMonth() + 1).toString())  + '-' + ((this.todayNum < 10) ? '0' + this.todayNum.toString() : this.todayNum.toString());
  yesterday = this.yearNum + '-' +  ((this.date.getMonth() + 1) < 10 ? '0' + (this.date.getMonth() + 1).toString() : (this.date.getMonth() + 1).toString())  + '-' + ((this.yesterdayNum < 10) ? '0' + this.yesterdayNum.toString() : this.yesterdayNum.toString());
  lastWeek = this.yearNum.toString() + '-' + ((this.thisMonth < 10) ? '0' + this.thisMonth.toString() : this.thisMonth.toString()) + '-' + ((this.lastWeekNum < 10) ? '0' + this.lastWeekNum.toString() : this.lastWeekNum.toString());
  createUser = this.yearNum.toString() + '-' + ((this.thisMonthNum < 10) ? '0' + this.thisMonthNum.toString() : this.thisMonthNum.toString()) + '-' + '01';

  weekToDate;
  daysInMonth = this.date.getDay();
  daysInLastMonth = new Date(this.yearNum, this.lastMonthNum, 0).getDate();


  lastMonth = this.yearNum.toString() + '-' + ((this.lastMonthNum < 10) ? '0' + this.lastMonthNum.toString() : this.lastMonthNum.toString()) + '-' + '01';
  lastDayOfLastMonth = this.yearNum.toString() + '-' + ((this.lastMonthNum < 10) ? '0' + this.lastMonthNum.toString() : this.lastMonthNum.toString()) + '-' + this.daysInLastMonth;

  monthsInYear = [
    {'month': 'January', 'value': '01'},
    {'month': 'February', 'value': '02'},
    {'month': 'March', 'value': '03'},
    {'month': 'April', 'value': '04'},
    {'month': 'May', 'value': '05'},
    {'month': 'June', 'value': '06'},
    {'month': 'July', 'value': '07'},
    {'month': 'August', 'value': '08'},
    {'month': 'September', 'value': '09'},
    {'month': 'October', 'value': '10'},
    {'month': 'November', 'value': '11'},
    {'month': 'December', 'value': '12'}
  ];

  constructor() {

  }

  parseDateIntoISO(val): string {
    if (!val.date) { return ''; }
    const date = val.date.toString();
    const tempMonth = date.slice(4, 7).toLowerCase();
    const day = date.slice(8, 10);
    const year = date.slice(11, 15);
    let month = '';
    switch (tempMonth) {
      case 'jan':
        month = '01';
        break;
      case 'feb':
        month = '02';
        break;
      case 'mar':
        month = '03';
        break;
      case 'apr':
        month = '04';
        break;
      case 'may':
        month = '05';
        break;
      case 'jun':
        month = '06';
        break;
      case 'jul':
        month = '07';
        break;
      case 'aug':
        month = '08';
        break;
      case 'sep':
        month = '09';
        break;
      case 'oct':
        month = '10';
        break;
      case 'nov':
        month = '11';
        break;
      case 'dec':
        month = '12';
        break;
    }
    return `${year}-${month}-${day}`;
  }

  getCurrentTimeISO() {
    const date = new Date();
    return this.today + 'T' + ((date.getHours() < 10) ? '0' + date.getHours().toString() : date.getHours().toString()) + ':' + ((date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes()) + ':' + ((date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds()) + ':' + date.getMilliseconds();
  }

  getCurrentDate() {
    return this.today;
  }

  // Moment
  private getCurrentDateMoment() {
    return moment(this.today);
  }

  getCurrentDateMinusXDays(x: number): string {
    const moment = this.getCurrentDateMoment().subtract(x, 'days');
    return moment.format('YYYY-MM-DD');
  }

  getMostRecentSunday() {
    const today = this.getCurrentDateMoment();
    for (let i = 0; i < 7; i++) {
      const pastDate = moment(today).subtract(i, 'days');
      if (pastDate.day() === 0) {
       return pastDate.format('YYYY-MM-DD');
      }
    }
  }

  getMostRecentSundayMoment() {
    const today = this.getCurrentDateMoment();
    for (let i = 0; i < 7; i++) {
      const pastDate = moment(today).subtract(i, 'days');
      if (pastDate.day() === 0) {
        return pastDate;
      }
    }
  }

  getMostRecentSundayMinusOneYear() {
    const mostRecentSunday = this.getMostRecentSundayMoment();
    return moment(mostRecentSunday).subtract(365, 'days').format('YYYY-MM-DD');
  }

  getcurrentDateTwoDigitNumber() {
    return this.today.substr(8, 2);
  }

  getYesterdayDate() {
    if (this.todayNum === 1) {
      return this.lastDayOfLastMonth;
    } else {
      return this.yesterday;
    }
  }

  getWeekToDateISO() {
    return this.getWeekToDateISO();
  }

  getLastMonthISO() {
    return this.getLastMonthISO();
  }

  getCurrentMonthNumber() {
    return new Promise((resolve) => {
      resolve(this.thisMonthNum);
    });
  }

  getCurrentYearNumber() {
    return new Promise((resolve) => {
      resolve(this.yearNum);
    });
  }

  getMonthDateRange(month) {
    return new Promise((resolve) => {
      const newDate = new Date();
      newDate.setMonth(month - 1, 1);
      const startDate = newDate.getFullYear() + '-' + ((newDate.getMonth() + 1) < 10 ? '0' + (newDate.getMonth() + 1).toString() : newDate.getMonth() + 1) + '-' + '01';
      newDate.setMonth(month, 0);
      const endDate = newDate.getFullYear() + '-' + ((newDate.getMonth() + 1) < 10 ? '0' + (newDate.getMonth() + 1).toString() : newDate.getMonth() + 1) + '-' + newDate.getDate();
      const rtnDate = startDate + ' ' + endDate;
      resolve(rtnDate);
    });
  }

  getMonthAndYearDateRange(month, year) {
    return new Promise((resolve) => {
      const newDate = new Date();
      newDate.setMonth(month - 1, 1);
      const startDate = year + '-' + ((newDate.getMonth() + 1) < 10 ? '0' + (newDate.getMonth() + 1).toString() : newDate.getMonth() + 1) + '-' + '01';
      newDate.setMonth(month, 0);
      const endDate = year + '-' + ((newDate.getMonth() + 1) < 10 ? '0' + (newDate.getMonth() + 1).toString() : newDate.getMonth() + 1) + '-' + newDate.getDate();
      const rtnDate = startDate + ' ' + endDate;
      resolve(rtnDate);
    });
  }

  getLastMonthDateRangeISO() {
    if (this.lastMonthNum !== 12) {
      const daysInLastMonth = new Date(this.date.getFullYear(), this.lastMonthNum, 0).getDate();
      const endOfLastMonth = this.date.getFullYear() + '-' + ((this.lastMonthNum < 10) ? '0' + this.lastMonthNum.toString() : this.lastMonthNum.toString()) + '-' + daysInLastMonth;
      return this.lastMonth + 'T00:00:00' + ' ' + endOfLastMonth + 'T23:59:59';
    } else {
      const daysInLastMonth = new Date(this.calculatePreviousYear(this.date.getFullYear()), this.lastMonthNum, 0).getDate();
      const endOfLastMonth = this.calculatePreviousYear(this.date.getFullYear()) + '-' + ((this.lastMonthNum < 10) ? '0' + this.lastMonthNum.toString() : this.lastMonthNum.toString()) + '-' + daysInLastMonth;
      return this.calculatePreviousMonth(this.lastMonth) + 'T00:00:00' + ' ' + endOfLastMonth + 'T23:59:59';
    }
  }

  calculatePreviousYear(year) {
    return year - 1;
  }

  calculatePreviousMonth(string) {
    const first = parseInt(string.slice(0, 4));
    const last = string.slice(4);
    let correctYear = (first - 1).toString();
    return correctYear + last;
  }

  geteWeekToDateDateRangeISO() {
    const dayDate = this.date.getDate();
    const daysFromMonday = this.date.getDay() - 1;
    const daysInLastMonth = this.daysInLastMonth;
    const lastWeekLastMonth = daysInLastMonth - (daysFromMonday - dayDate);

    let startDate;
    let endDate;

    if (this.date.getDay() === 1) {
      startDate = this.today + 'T00:00:00';
      endDate = this.today + 'T23:59:59';
    }

    if (this.date.getDay() > 1) {
      startDate = this.yearNum + '-' + ((this.thisMonth < 10) ? '0' + this.thisMonth.toString() : this.thisMonth.toString()) + '-' + (((this.todayNum - daysFromMonday) < 10 ? '0' + (this.todayNum - daysFromMonday) : (this.todayNum - daysFromMonday)) + 'T00:00:00');
      endDate = this.today + 'T23:59:59';
    }

    if (dayDate < 7) {
      startDate = this.yearNum + '-' + ((this.lastMonthNum < 10) ? '0' + this.lastMonthNum.toString() : this.lastMonthNum.toString()) + '-' + lastWeekLastMonth + 'T00:00:00';
      endDate = this.today + 'T23:59:59';
    }

    return startDate + ' ' + endDate;
  }

  getLastMonthNumber() {
    const lastMonthNum = this.date.getMonth();
    if (lastMonthNum === 0) {
      return 12;
    } else {
      return lastMonthNum;
    }
  }

  getLast90DaysDateRange() {
    const today: string = this.today;
    const startDay: string = this.today.slice(8, 10);
    let startMonth: string;
    let startYear: number = this.yearNum;
    const month: string = today.slice(5, 7);
    if (month === '01') {
      startMonth = '10';
      startYear--;
    } else if (month === '02') {
      startMonth = '11';
      startYear--;
    } else if (month === '03') {
      startMonth = '12';
      startYear--;
    } else {
      startMonth = (parseInt(month) - 3).toString();
    }

    if (startMonth.length === 1) {
      startMonth = '0' + startMonth;
    }

    return `${startYear}-${startMonth}-${startDay} ${today}`;
  }

  getYearToDateDateRange() {
    const today: string = this.today;
    const startDay: string = this.today.slice(8, 10);
    const startMonth: string = this.today.slice(5, 7);
    const thisYear: string = this.today.slice(0, 4);
    const thisYearNum: number = parseInt(thisYear);
    const lastYear: string = (thisYearNum - 1).toString();

    return `${lastYear}-${startMonth}-${startDay} ${today}`;
  }
}