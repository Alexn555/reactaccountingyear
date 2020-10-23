import React from 'react';
import { Grid, GridColumn, GridRow, Divider, Button } from 'semantic-ui-react';
import { getWeekNumber, getWeekYear } from '../../utils/date';
import './quarterItem.scss';

import TaskQuarterCell from './taskCell';

function QuarterItem(props) {
    const { tasks } = props;
    const { monthInfo } = props;
    const { year, weeks } = monthInfo;

    const BlankCell = (
        <GridColumn className="blankCell" >
            <Button icon='circle outline' />
        </GridColumn>
    );

    const weeksList = weeks.map( function(monthItem, index) {
        const { weekNumber } = monthItem;
        return (
            <GridColumn key={index}>
                {weekNumber}
                <Divider />
                {
                    tasks.map( function(task, index) {
                        const startDateWeekNum = getWeekNumber(task.startDate);
                        const endDateWeekNum = getWeekNumber(task.endDate);
                        const taskYear = getWeekYear(task.startDate);

                        const TaskCell = <TaskQuarterCell task={task} />;

                        let Cell = BlankCell;
                        if (year === taskYear
                            && weekNumber >= startDateWeekNum
                            && weekNumber <= endDateWeekNum) {
                            Cell = TaskCell;
                        }
                        return (
                            <GridRow key={index} className="cellRow">
                                {Cell}
                            </GridRow>
                        );
                      })
                }
            </GridColumn>
        );
    });

    return (
        <GridColumn>
            <h2>{monthInfo.month}</h2>
            <GridRow>
                <Grid columns={weeks.length} divided>
                    {weeksList}
                </Grid>
            </GridRow>
        </GridColumn>
    );
}

export default QuarterItem;