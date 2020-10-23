import React, { Component} from 'react';
import { connect } from 'react-redux';
import { Message, Segment, Button } from 'semantic-ui-react';
import { getTasks } from '../../actions/task-actions';
import { shiftMonth } from '../../utils/date';

import './quarter-calendar.scss';
import TaskQuarter from '../../components/quarter';

class QuarterCalendarPage extends Component {

  state = {
    currentDate: '',
  };

  componentDidMount() {
	this.props.getTasks();
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    if (value.length > 9) {
        this.setState({ currentDate: value });
    }
  }

  setStartDate() {
    return (
        <>
            <h2>Start Date</h2>
            <input type="text"
                   className="filterField"
                   placeholder="DD.MM.YYYY"
                   name="filterName" onChange={this.handleInputChange.bind(this)}
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
