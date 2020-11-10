// Date utility helper
import moment from 'moment';
import { DATE_FORMAT } from '../common/settings';

export function getWeeksInMonth(month, year){
    month = month - 1;
    const monthStart = moment().year(year).month(month).date(1);
    const monthEnd = moment().year(year).month(month).endOf('month');
    const numDaysInMonth = moment().year(year).month(month).endOf('month').date();

    //calculate weeks in given month
    const weeks = Math.ceil((numDaysInMonth + monthStart.day()) / 7);
    let weekRange = [];
    let weekStart = moment().year(year).month(month).date(1);
    let i = 0;
    let weekNumber = moment(weekStart, "MM-DD-YYYY").week();

    while(i < weeks){
        let weekEnd = moment(weekStart);

        if(weekEnd.endOf('week').date() <= numDaysInMonth && weekEnd.month() === month) {
            weekEnd = weekEnd.endOf('week').format('LL');
        }else{
            weekEnd = moment(monthEnd);
            weekEnd = weekEnd.format('LL')
        }

        weekRange.push({
            weekStart: weekStart.format('LL'),
            weekEnd: weekEnd,
            weekNumber: weekNumber
        });

        weekStart = weekStart.weekday(7);
        weekNumber = moment(weekStart, "MM-DD-YYYY").week();

        i++;
    }
    return weekRange;
}

export function dateToTimestamp(dateStr) {
    if (dateStr === '') { return 0; }
    const date = parseDateString(dateStr);
    const formatDate = new Date( date.year, date.month - 1, date.day);
    const tms = formatDate.getTime();
    return tms;
}

export function parseDateString(dateStr = '') {
    const date = dateStr.split('.');
    const month = parseInt(date[1]);
    const year = parseInt(date[2]);
    const day = parseInt(date[0]);
    return { day: day, month: month, year: year };
}

export function shiftMonth(currentDate, side = 'prev', monthCount = 1) {
    const date = parseDateString(currentDate);
    const formatedDate = `${date.month}/${date.day}/${date.year}`;
    let newDate;
    if (side === 'prev') {
        newDate = moment(formatedDate).subtract(monthCount, 'months').format(DATE_FORMAT);
    } else {
        newDate = moment(formatedDate).add(monthCount, 'months').format(DATE_FORMAT);
    }
    return newDate;
}

export function getGetStrFromDate(dateStr) {
    return moment(dateStr).format(DATE_FORMAT);
}

export function getDateFromStr(str) {
    const arrDate = str.split('.');
    const dt = new Date(arrDate[2], arrDate[1] - 1, arrDate[0]);
    return dt;
}

export function getWeekNumber(date) {
    if (date !== '' && date.length > 9) {
        return moment(date, DATE_FORMAT).week();
    }
    return -1;
}

export function getWeekYear(date) {
    if (date !== '' && date.length > 9) {
        return moment(date, DATE_FORMAT).year();
    }
    return -1;
}

export function getQuarter(month = 0) {
    const m = Math.floor(month / 3) + 1;
    return m > 4? m - 4 : m;
}

export function getMonthName(year = 2020, month = 0) {
    month = month === 0 ? month + 1 : month;
    const monthMinusOneName = moment().year(year).month(month).subtract(1, 'month')
        .startOf('month').format('MMMM');
    return monthMinusOneName;
}

export function getNextMonth(month = 0) {
    return month === 12 ? 0 : month + 1;
}

export function getNextYear(month = 0, year) {
    return month === 12 ? year + 1 : year;
}