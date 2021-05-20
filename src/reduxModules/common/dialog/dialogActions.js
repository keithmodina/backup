import { CLOSE_CONFIRMATION_DIALOG, OPEN_CONFIRMATION_DIALOG, RESET_CONFIRMATION_DIALOG_PROPS } from '.';
import { DIALOG_RESET_PROPS_TIMEOUT } from '../../../constants/timeout';

export const actionOpenConfirmationDialog = props => ({
  type: OPEN_CONFIRMATION_DIALOG,
  payload: { props }
});

export const actionCloseConfirmationDialog = () => async dispatch => {
  dispatch({ type: CLOSE_CONFIRMATION_DIALOG });

  window.setTimeout(() => {
    dispatch({ type: RESET_CONFIRMATION_DIALOG_PROPS });
  }, DIALOG_RESET_PROPS_TIMEOUT);
};
