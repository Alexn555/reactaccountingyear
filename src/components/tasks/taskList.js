import React from 'react';
import { Message, Table } from 'semantic-ui-react'

import TaskItem from './taskItem';

function TaskList(props) {
    const tasks = props.taskList;
    const { editTaskSubmit, deleteTask } = props;

    if (tasks === null) {
        return <Message>No tasks</Message>;
    }
    const itemList = tasks.map( (item, index) =>
		<TaskItem key={index}
				  task={item} index={index}
				  editTaskSubmit={editTaskSubmit}
				  deleteTask={deleteTask}/>
    );
    return (
		<Table.Body>
            {itemList}
		</Table.Body>
    );
}

export default TaskList;