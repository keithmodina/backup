import {
  SET_ACTIVE_TAB
} from './index';

export const actionSetActiveTab = activeTab => dispatch => dispatch({ type: SET_ACTIVE_TAB, payload: activeTab });
