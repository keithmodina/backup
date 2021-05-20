import auth from './auth';

export const LOGIN = '[auth] LOGIN';
export const CHANGE_PASSWORD = '[auth] CHANGE_PASSWORD';
export const LOGOUT = '[auth] LOGOUT';
export const FORGOT_PASSWORD = '[auth] FORGOT_PASSWORD';
export const GET_CURRENT_SESSION = '[auth] GET_CURRENT_SESSION';
export const CLEAR_ERROR_DATA = '[auth] CLEAR_ERROR_DATA';
export const CREATE_NEW_PASSWORD_FIRST_TIME_LOGIN = '[auth] CREATE_NEW_PASSWORD_FIRST_TIME_LOGIN';

export {
  actionForgotPasswordSubmit,
  actionCheckAuth,
  actionClearErrorData,
  actionForgotPassword,
  actionGetCurrentSession,
  actionCompleteNewPassword,
  actionLogin,
  actionLogout
} from './authActions';

export default auth;
