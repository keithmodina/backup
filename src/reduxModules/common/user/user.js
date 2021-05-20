import {
  GET_PROFILE,
  TOGGLE_USER_DRAWER
} from './index';

export const initialState = {
  profile: {},
  isDrawerVisible: false
};

const user = (state = initialState, action = {}) => {
  switch (action.type) {
    case TOGGLE_USER_DRAWER:
      return {
        ...state,
        isDrawerVisible: action.payload
      };
    default:
      return state;
  }
};

export default user;
