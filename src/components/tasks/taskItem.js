import React, { Component } from 'react';
import { Icon, Table } from 'semantic-ui-react';
import styles from './tasks.module.scss';

export default class TaskItem extends Component {

  constructor(props) {
    super(props);
    this.state = { isEdit: false };
    this.editTask = this.editTask.bind(this);
    this.editTaskSubmit = this.editTaskSubmit.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  editTask() {
    this.setState((prevState,props) => ({
      isEdit : !prevState.isEdit
    }));
  }

  editTaskSubmit() {
    this.setState((prevState,props) => ({
      isEdit : !prevState.isEdit
    }));
    this.props.editTaskSubmit(
		this.props.task.id,
		this.nameInput.value,
		this.startDateInput.value,
		this.endDateInput.value,
	);
  }

  deleteTask() {
    const { id } = this.props.task;
	this.props.deleteTask(id);
  }

  editItemView() {
	const { name, startDate, endDate } = this.props.task;
	return (
		<Table.Row key={this.props.index}>
			<Table.Cell>
				<input
					type="text"
					ref={nameInput => this.nameInput = nameInput}
					defaultValue={name}
					className={styles.nameInput}
				/>
			</Table.Cell>
			<Table.Cell>
				<input type="text"
					   ref={startDateInput => this.startDateInput = startDateInput}
					   defaultValue={startDate}
					   placeholder="DD.MM.YYYY"
					   pattern="\d{1,2}.\d{1,2}.\d{4}"
				/>
			</Table.Cell>
			<Table.Cell>
				<input
					type="text"
					ref={endDateInput => this.endDateInput = endDateInput}
					defaultValue={endDate}
					placeholder="DD.MM.YYYY"
					pattern="\d{1,2}.\d{1,2}.\d{4}"
				/>
			</Table.Cell>
			<Table.Cell>
				<Icon name="save outline" className="button" onClick={this.editTaskSubmit} />
			</Table.Cell>
			<Table.Cell>
				<Icon name="trash" className="button" />
			</Table.Cell>
	    </Table.Row>
	);
  }

  readItemView() {
	  const { name, startDate, endDate } = this.props.task;
	  return (
	      <Table.Row key={this.props.index}>
			  <Table.Cell>{name}</Table.Cell>
			  <Table.Cell>{startDate}</Table.Cell>
			  <Table.Cell>{endDate}</Table.Cell>
			  <Table.Cell>
				  <Icon name="edit" className={styles.button} onClick={this.editTask} />
			  </Table.Cell>
			  <Table.Cell>
				  <Icon name="trash alternate" className={styles.button} onClick={this.deleteTask} />
			  </Table.Cell>
		  </Table.Row>
	  );
  }

  render() {
      return (
        this.state.isEdit === true ? this.editItemView() : this.readItemView()
      );
  }

 }