export function getTasks() {
    return {
        type:'GET_TASKS',
        payload: ''
    }
}

export function addTask(task) {
    return {
		type:'ADD_TASK',
		payload: task
    }
}

export function deleteTask(id) {
    return {
		type:'DELETE_TASK',
		payload: id
    };
}

export function updateTask(task) {
    return {
        type:'UPDATE_TASK',
        payload: task
    }
}
