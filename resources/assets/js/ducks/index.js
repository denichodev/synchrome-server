import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import calendar from './calendar';
import event from './event';

export const initialState = {
  router: {},
  activeCalendar: calendar.activeCalendarInitialState,
  calendars: calendar.allCalendarInitialState,
  event: event.initialState
};

const rootReducer = combineReducers({
  router,
  activeCalendar: calendar.activeCalendarReducer,
  calendars: calendar.allCalendarReducer,
  event: event.eventReducer
});

export default rootReducer;
