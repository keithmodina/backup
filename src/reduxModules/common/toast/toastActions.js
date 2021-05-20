import { SHOW_TOAST, HIDE_TOAST } from './index';

const TOAST_DURATION = 3000;
let timeoutToast = null;

export const actionShowToast = props => dispatch => {
  dispatch({ type: SHOW_TOAST, payload: { props } });
  if (timeoutToast) clearTimeout(timeoutToast);
  timeoutToast = setTimeout(() => dispatch(actionHideToast()), TOAST_DURATION);
};

export const actionHideToast = () => ({
  type: HIDE_TOAST
});
