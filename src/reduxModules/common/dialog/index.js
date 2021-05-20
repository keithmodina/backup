import dialog from './dialog';

export const OPEN_CONFIRMATION_DIALOG = '[dialog] OPEN_CONFIRMATION_DIALOG';
export const CLOSE_CONFIRMATION_DIALOG = '[dialog] CLOSE_CONFIRMATION_DIALOG';
export const RESET_CONFIRMATION_DIALOG_PROPS = '[dialog] RESET_CONFIRMATION_DIALOG';

export {
  actionOpenConfirmationDialog,
  actionCloseConfirmationDialog
} from './dialogActions';

export default dialog;
