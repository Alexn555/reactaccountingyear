import { combineReducers } from 'redux';
import TaskReducer from './task-reducer';

const reducers = {
  tasksStore: TaskReducer,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
