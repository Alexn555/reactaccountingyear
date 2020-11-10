import React, { Component} from 'react';
import { connect } from 'react-redux';
import { Message, Segment, Button } from 'semantic-ui-react';

import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';

import { DATE_FORMAT } from '../../common/settings';

import { getTasks } from '../../actions/task-actions';
import { shiftMonth, getGetStrFromDate, getDateFromStr } from '../../utils/date';

import './quarter-calendar.scss';
import TaskQuarter from '../../components/quarter';


class QuarterCalendarPage extends Component {

  state = {
    currentDate: '',
  };

  componentDidMount() {
	this.props.getTasks();
	this.setState({ currentDate: '10.05.2020' });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    if (value.length > 9) {
        this.setState({ currentDate: value });
    }
  }

  onDatePickChange(event, data) {
      if (data && data !== null && data.value !== null){
          const parsed = getGetStrFromDate(data.value);
          this.setState({ currentDate: parsed });
      }
  }

  setStartDate() {
    const { currentDate } = this.state;
    if (currentDate === null || currentDate === '') { return null};
    return (
        <>
            <h2>Start Date</h2>
            <input type="text"
                   className="filterField"
                   value={currentDate}
                   placeholder={DATE_FORMAT}
                   name="filterName" onChange={this.handleInputChange.bind(this)}
            />
          <SemanticDatepicker
              onChange={this.onDatePickChange.bind(this)}
              value={getDateFromStr(currentDate)}
              format={DATE_FORMAT}
          />
        </>
    );
  }

  previousMonth() {
     const { currentDate } = this.state;
     const res = shiftMonth(currentDate, 'prev');
     this.setState({ currentDate: res });
  }

  nextMonth() {
      const { currentDate } = this.state;
      const res = shiftMonth(currentDate, 'next');
      this.setState({ currentDate: res });
  }

  showArrows() {
    const { currentDate } = this.state;
    if (currentDate === '') { return null };
    return (
        <div className="arrows">
            <div>
                <Button icon='angle left' onClick={this.previousMonth.bind(this)} />
            </div>
            <div>
                <Button icon='angle right' onClick={this.nextMonth.bind(this)} />
            </div>
        </div>
    );
  }

  render() {
    const { currentDate } = this.state;
    const { tasks } = this.props;
    if (tasks && tasks.length <= 0) {
        return (<Message> No tasks! </Message>);
    }
    return (
      <div>
          <Segment>
             {this.setStartDate()}
             {this.showArrows()}
          </Segment>

          <TaskQuarter startDate={currentDate} tasks={tasks} />
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    tasks: state.tasksStore
  }
}

export default connect(mapStateToProps, {getTasks})(QuarterCalendarPage);
