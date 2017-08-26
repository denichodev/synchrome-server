import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import calendar from './calendar';

const rootReducer = combineReducers({
  router,
  activeCalendar: calendar.activeCalendarReducer,
  calendars: calendar.allCalendarReducer
});

export default rootReducer;
