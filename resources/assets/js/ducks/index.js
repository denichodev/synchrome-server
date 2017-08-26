import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import calendar from './calendar';

export const initialState = {
  router: {},
  activeCalendar: {
    error: '',
    data: []
  },
  calendars: {
    error: '',
    data: []
  }
};

const rootReducer = combineReducers({
  router,
  activeCalendar: calendar.activeCalendarReducer,
  calendars: calendar.allCalendarReducer
});

export default rootReducer;
