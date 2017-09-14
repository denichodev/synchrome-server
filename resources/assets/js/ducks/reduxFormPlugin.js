import { eventTypes } from './event';
import { employeeTypes } from './employee';

export default {
  eventForm: (state, action) => {
    switch (action.type) {
      case eventTypes.CALENDAR_DATE_SELECTED:
        return {
          ...state,
          values: {
            ...state.values,
            start: action.payload.start,
            end: action.payload.end
          }
        };
      case eventTypes.ADD_EVENT_TO_POST:
        return undefined;
      default:
        return state;
    }
  },
  newEmployeeForm: (state, action) => {
    switch (action.type) {
      case employeeTypes.CLEAR_SELECTED_ECHELON:
        return {
          ...state,
          values: {
            ...state.values,
            echelon_id: ''
          }
        };
      default:
        return state;
    }
  }
};
