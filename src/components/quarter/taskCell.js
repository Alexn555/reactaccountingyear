import React from 'react';
import { Popup, Button } from 'semantic-ui-react';
import './quarterItem.scss';

function TaskQuarterCell(props) {
    const { task } = props;

    // cell with popup task name information
    const TaskCell = (
        <Popup
            content={task.name}
            trigger={<Button primary icon='external alternate'/>}
        />
    );

    return (
        <>
          {TaskCell}
        </>
    );
}

export default TaskQuarterCell;