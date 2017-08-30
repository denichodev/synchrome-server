import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

// Made reducers
import calendar from './calendar';
import event from './event';
import agency from './agency';
import echelon from './echelon';
import employee from './employee';
import cluster from './cluster';
import user from './user';

export const initialState = {
  router: {},
  activeCalendar: calendar.activeCalendarInitialState,
  calendars: calendar.allCalendarInitialState,
  event: event.initialState,
  agency: agency.initialState,
  echelon: echelon.initialState,
  employee: employee.initialState,
  cluster: cluster.initialState,
  user: user.initialState
};

const rootReducer = combineReducers({
  router,
  form: formReducer.plugin(event.reduxFormPlugin),
  activeCalendar: calendar.activeCalendarReducer,
  calendars: calendar.allCalendarReducer,
  event: event.eventReducer,
  agency: agency.agencyReducer,
  echelon: echelon.echelonReducer,
  employee: employee.employeeReducer,
  cluster: cluster.clusterReducer,
  user: user.userReducer
});

export default rootReducer;
