import {
  START_SCROLLING,
  STOP_SCROLLING
} from './index';

const initialState = {
  isScrolling: false
};

const scroll = (state = initialState, action = {}) => {
  switch (action.type) {
    case START_SCROLLING:
      return {
        ...state,
        isScrolling: true
      };
    case STOP_SCROLLING:
      return {
        ...state,
        isScrolling: false
      };
    default:
      return state;
  }
};

export default scroll;
