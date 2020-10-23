import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import TaskListPage from './pages/tasks/tasks';
import QuarterCalendar from './pages/quarter/quarter-calendar';

class App extends Component {
    render() {
      return (
          <div className="container">
            <div className="ui two item menu">
              <NavLink className="item" activeClassName="active" exact to="/">Tasks</NavLink>
			  <NavLink className="item" activeClassName="active" exact to="/quarter">Quarter</NavLink>
            </div>
            <Route exact path="/" component={TaskListPage}/>
			<Route path="/quarter" component={QuarterCalendar}/>
          </div>
      );
   }
}

export default App;
