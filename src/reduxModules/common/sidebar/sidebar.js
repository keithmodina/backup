import {
  SET_ACTIVE_TAB
} from './index';

const initialState = {
  activeTab: null
};

const activeTab = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_ACTIVE_TAB:
      return {
        ...state,
        activeTab: action.payload
      };
    default:
      return state;
  }
};

export default activeTab;
