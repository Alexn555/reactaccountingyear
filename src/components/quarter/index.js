import React, { Component } from 'react';
import { Segment, Message, Grid } from 'semantic-ui-react';
import {
    getNextMonth,
    parseDateString,
    getQuarter,
    getWeeksInMonth,
    getMonthName,
    getNextYear
} from '../../utils/date';
import { getScreenColumnsDivider } from '../../utils/screen';
import QuarterItem from './quarterItem';

import './quarter.scss';

export default class TaskQuarter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            columns: 3,
        };
        this.updateResize = this.updateResize.bind(this);
    }

    updateResize() {
        this.setState({
            columns: getScreenColumnsDivider(window.innerWidth)
        });
    }

    componentDidMount() {
       window.addEventListener('resize', this.updateResize);
       this.updateResize();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateResize);
    }

    createCalendar(startDate = '01.05.2020', tasks) {
        if (startDate === '') { return (<Message>Set start date</Message>); }
        const { columns } = this.state;

        const quarterCount = 3; // months in quarter

        const date = parseDateString(startDate);
        const month = date.month;
        const year = date.year;

        const quarterNumber = getQuarter(month);
        const CalendarObject = [];

        let nextMonth = month;
        let yearOfNextMonth = year;
        for (let i = 0; i < quarterCount; i++) {
            const weeksRange = getWeeksInMonth(nextMonth, year);
            const monthName = getMonthName(yearOfNextMonth, nextMonth);
            nextMonth = getNextMonth(month + i);
            yearOfNextMonth = getNextYear(nextMonth, year);
            CalendarObject.push({ month: monthName, year: year, weeks: weeksRange });
        }

        const monthList = CalendarObject.map( (item, index) =>
            <QuarterItem key={index} monthInfo={item} tasks={tasks} />
        );

        return (
            <>
                <h2 className="title">
                    {quarterNumber} Quarter {year}
                </h2>
                <Grid columns={columns} divided>
                    {monthList}
                </Grid>
            </>
        );
    }

    render() {
        const { tasks, startDate } = this.props;
        if (tasks !== null) {
            const graphics = this.createCalendar(startDate, tasks);
            return (
                <Segment>
                    {graphics}
                </Segment>
            );
        } else {
            return <Message>No information</Message>;
        }
    }

}