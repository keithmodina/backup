import {
  GET_USER_DETAILS,
  GET_USER_LIST,
  SET_USER_FILTERS
} from './index';
import {
  PENDING,
  SUCCESS,
  ERROR
} from '../../constants/statusTypes';

const initialState = {
  user: {},
  isFetchingUserDetails: false,
  isFetchUserDetailsSuccess: false,
  isFetchUserDetailsError: false,
  isFetchingListUser: false,
  isFetchListUserSuccess: false,
  isFetchListUserError: false,
  userList: [],
  userFilter: {}
};

const settings = (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_USER_DETAILS + PENDING:
      return {
        ...state,
        isFetchingUserDetailsPending: true
      };
    case GET_USER_DETAILS + SUCCESS:
      return {
        ...state,
        isFetchingUserDetails: false,
        isFetchUserDetailsSuccess: true,
        user: action.payload
      };
    case GET_USER_DETAILS + ERROR:
      return {
        ...state,
        isFetchingUserDetails: false,
        isFetchUserDetailsSuccess: false,
        isFetchUserDetailsError: true
      };
    case GET_USER_LIST + PENDING:
      return {
        ...state,
        isFetchingListUser: true
      };
    case GET_USER_LIST + SUCCESS:
      return {
        ...state,
        isFetchingListUser: false,
        isFetchListUserSuccess: true,
        userList: action.payload
      };
    case GET_USER_LIST + ERROR:
      return {
        ...state,
        isFetchingListUser: false,
        isFetchListUserSuccess: false,
        isFetchListUserError: true
      };
    case SET_USER_FILTERS:
      return {
        ...state,
        userFilter: action.payload
      };
    default:
      return state;
  }
};

export default settings;
