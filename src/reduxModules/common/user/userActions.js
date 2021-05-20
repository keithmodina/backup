import {
  GET_PROFILE,
  TOGGLE_USER_DRAWER
} from './index';

export const actionToggleUserDrawer = props => ({
  type: TOGGLE_USER_DRAWER,
  payload: props
});
