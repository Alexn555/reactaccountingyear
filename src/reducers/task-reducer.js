
// default array on start, if wasn't saved before
let InitTasksList = [
	{
		id: 1,
		name: 'Task 1',
		startDate: '01.05.2020',
		endDate: '20.05.2020',
	},
    {
        id: 2,
        name: 'Task 2',
        startDate: '10.09.2020',
        endDate: '15.09.2020',
    },
];

(() => {
  // on load application gets saved array from localstorage
	if( localStorage.getItem('tasks') === null) {
		localStorage.setItem('tasks', JSON.stringify(InitTasksList));
	}
	else {
		InitTasksList = JSON.parse(localStorage.getItem('tasks'));
	}
})();


const taskReducer = (state = InitTasksList, action) => {
    let stateCurrent;
	switch(action.type){

		case 'ADD_TASK':
            stateCurrent = [...state, action.payload];
			localStorage.setItem('tasks', JSON.stringify(stateCurrent));
		return stateCurrent;

		case 'DELETE_TASK':
		    stateCurrent = state.filter( x => x.id !== action.payload);
			localStorage.setItem('tasks', JSON.stringify(stateCurrent));
		return stateCurrent;

		case 'UPDATE_TASK':
            stateCurrent = state.map((task) => {
			const {id, name, startDate, endDate } = action.payload;
				if (task.id === id) {
					task.name = name;
					task.startDate = startDate;
					task.endDate = endDate;
				}
				return task;
			});
			localStorage.setItem('tasks', JSON.stringify(stateCurrent));
		return stateCurrent;

		case 'GET_TASKS':
			return state;

		default:
			return state;
	}

}
export default taskReducer;