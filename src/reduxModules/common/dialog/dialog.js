import {
  OPEN_CONFIRMATION_DIALOG,
  CLOSE_CONFIRMATION_DIALOG,
  RESET_CONFIRMATION_DIALOG_PROPS
} from '.';

const initialState = {
  isConfirmationDialogOpen: false,
  confirmationDialogProps: {}
};

const dialog = (state = initialState, action = {}) => {
  switch (action.type) {
    case OPEN_CONFIRMATION_DIALOG:
      return {
        ...state,
        isConfirmationDialogOpen: true,
        confirmationDialogProps: action.payload.props
      };
    case CLOSE_CONFIRMATION_DIALOG:
      return {
        ...state,
        isConfirmationDialogOpen: false
      };
    case RESET_CONFIRMATION_DIALOG_PROPS:
      return {
        ...state,
        confirmationDialogProps: initialState.confirmationDialogProps
      };
    default: return state;
  }
};

export default dialog;
