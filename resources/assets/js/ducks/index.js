import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

// Made reducers
import calendar from './calendar';
import event from './event';
import agency from './agency';
import echelon from './echelon';

export const initialState = {
  router: {},
  activeCalendar: calendar.activeCalendarInitialState,
  calendars: calendar.allCalendarInitialState,
  event: event.initialState,
  agency: agency.initialState,
  echelon: echelon.initialState
};

const rootReducer = combineReducers({
  router,
  activeCalendar: calendar.activeCalendarReducer,
  calendars: calendar.allCalendarReducer,
  event: event.eventReducer,
  agency: agency.agencyReducer,
  echelon: echelon.echelonReducer
});

export default rootReducer;
