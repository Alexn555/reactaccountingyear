import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Segment, Table, Button } from 'semantic-ui-react';
import { MAX_TASKS } from '../../common/settings';

import { dateToTimestamp } from '../../utils/date';
import { filterItems } from '../../utils/object';
import { getRandomInt } from '../../utils/number';

import { addTask, updateTask, deleteTask } from '../../actions/task-actions';

import './tasks.scss';
import TaskList from '../../components/tasks/taskList';


class TasksListPage extends Component {

  constructor(props) {
    super(props);
    this.addNewTask = this.addNewTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.editTaskSubmit = this.editTaskSubmit.bind(this);
	this.state = { taskList: [] }
  }

  componentDidMount(){
	this.setState({
		taskList: this.props.taskList
	});
	this.savedList = this.props.taskList;
  }

  componentDidUpdate(prevProps) {
  	const { taskList } = this.props;
	 if (prevProps.taskList !== this.props.taskList) {
         if (taskList && taskList.length > 0) {
             this.setState({ taskList: taskList });
         }
	 }
  }

  addNewTask() {
  	 const { taskList } = this.props;
  	 if (typeof taskList !== 'undefined' && taskList.length >= MAX_TASKS) {
  	 	return alert(`You cannot add more than ${MAX_TASKS} tasks`);
	 }
	 this.props.addTask({
		id:Math.max(...this.props.taskList.map(function(newItem){
		return newItem.id})) + 1,
		   name: `Task ${getRandomInt(1, 10000)}`,
		   startDate: '',
		   endDate:''
	    }
	);
  }

  deleteTask(id) {
    let confirmDialog = window.confirm("Do you want to delete this item");
    if( confirmDialog === true){
		this.props.deleteTask(id);
	}
  }

  editTaskSubmit(id, name, startDate, endDate) {
  	const startTms = dateToTimestamp(startDate);
  	const endTms = dateToTimestamp(endDate);
  	if (startTms > endTms) {
  		return alert('You cannot have start date bigger than end date!');
	}
	this.props.updateTask({
		id: id,
		name: name,
		startDate: startDate,
		endDate: endDate,
	});
  }

  addNewTaskLink() {
	return (
		<Button color="blue" onClick={this.addNewTask}>
			Add New
		</Button>
	);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
	// check if name in array and show findings
	if (value.length > 3) {
		let filteredList = filterItems('name', value, this.state.taskList);
		this.setState({
			taskList: filteredList
		});
	} else { //restore previously saved
		this.setState({
			taskList: this.savedList
		});
	}
  }

  showFilterInput() {
	return (
		<input type="text"
		  className="filterField"
		  placeholder="Search Name"
		  name="filterName" onChange={this.handleInputChange.bind(this)}
		/>
	);
  }

  render() {
    return (
		<Container>
			<Segment>
				Name search {this.showFilterInput()}
			 </Segment>

			<Table celled>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Name</Table.HeaderCell>
						<Table.HeaderCell>Start Date</Table.HeaderCell>
						<Table.HeaderCell>End Date</Table.HeaderCell>
						<Table.HeaderCell>Edit</Table.HeaderCell>
						<Table.HeaderCell>Delete</Table.HeaderCell>
					</Table.Row>
				</Table.Header>

				<TaskList
					deleteTask={this.deleteTask}
					taskList={this.state.taskList}
					editTaskSubmit={this.editTaskSubmit}
				/>
			</Table>

			{this.addNewTaskLink()}
		  </Container>
		);
    }

 }

const mapStateToProps = (state) => {
  return {
    taskList: state.tasksStore
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addTask: addTask,
    updateTask: updateTask,
    deleteTask: deleteTask
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksListPage);
