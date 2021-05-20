import {
  LOGIN,
  CHANGE_PASSWORD,
  FORGOT_PASSWORD,
  GET_CURRENT_SESSION,
  CLEAR_ERROR_DATA,
  CREATE_NEW_PASSWORD_FIRST_TIME_LOGIN
} from './index';

import {
  PENDING,
  SUCCESS,
  ERROR
} from '../../../constants/statusTypes';

const initialState = {
  changePasswordData: {},
  changePasswordError: false,
  changePasswordErrorData: null,
  changePasswordPending: false,
  changePasswordSuccess: false,
  codeDelivery: {},
  cognitoData: {},
  currentSession: {},
  currentSessionError: false,
  currentSessionPending: false,
  currentSessionSuccess: false,
  forgotPasswordError: false,
  forgotPasswordErrorData: null,
  forgotPasswordPending: false,
  forgotPasswordSuccess: false,
  loginError: false,
  loginErrorData: null,
  loginPending: false,
  loginSuccess: false,
  firstTimeLoginData: {},
  firstTimeLoginPending: false,
  firstTimeLoginSuccess: false,
  firstTimeLoginError: false,
  firstTimeLoginErrorData: {}
};

const auth = (state = initialState, action = {}) => {
  switch (action.type) {
    case LOGIN + PENDING:
      return {
        ...state,
        loginPending: true
      };
    case LOGIN + SUCCESS:
      return {
        ...state,
        cognitoData: action.payload,
        loginPending: false,
        loginSuccess: true
      };
    case LOGIN + ERROR:
      return {
        ...state,
        loginPending: false,
        loginError: true,
        loginErrorData: action.payload
      };
    case CREATE_NEW_PASSWORD_FIRST_TIME_LOGIN + PENDING:
      return {
        ...state,
        firstTimeLoginPending: true,
        firstTimeLoginData: action.payload
      };
    case CREATE_NEW_PASSWORD_FIRST_TIME_LOGIN + SUCCESS:
      return {
        ...state,
        firstTimeLoginSuccess: true,
        firstTimeLoginData: action.payload,
        firstTimeLoginPending: false
      };
    case CREATE_NEW_PASSWORD_FIRST_TIME_LOGIN + ERROR:
      return {
        ...state,
        firstTimeLoginError: true,
        firstTimeLoginErrorData: action.payload,
        firstTimeLoginPending: false
      };
    case CHANGE_PASSWORD + PENDING:
      return {
        ...state,
        changePasswordPending: true
      };
    case CHANGE_PASSWORD + SUCCESS:
      return {
        ...state,
        changePasswordData: action.payload,
        changePasswordPending: false,
        changePasswordSuccess: true
      };
    case CHANGE_PASSWORD + ERROR:
      return {
        ...state,
        changePasswordPending: false,
        changePasswordError: true,
        changePasswordErrorData: action.payload
      };
    case FORGOT_PASSWORD + PENDING:
      return {
        ...state,
        forgotPasswordPending: true
      };
    case FORGOT_PASSWORD + SUCCESS:
      return {
        ...state,
        codeDelivery: action.payload,
        forgotPasswordPending: false,
        forgotPasswordSuccess: true
      };
    case FORGOT_PASSWORD + ERROR:
      return {
        ...state,
        forgotPasswordPending: false,
        forgotPasswordError: true,
        forgotPasswordErrorData: action.payload
      };
    case GET_CURRENT_SESSION + PENDING:
      return {
        ...state,
        currentSessionPending: true
      };
    case GET_CURRENT_SESSION + SUCCESS:
      return {
        ...state,
        currentSession: action.payload,
        currentSessionPending: false,
        currentSessionSuccess: true
      };
    case GET_CURRENT_SESSION + ERROR:
      return {
        ...state,
        currentSessionPending: false,
        currentSessionError: true
      };
    case CLEAR_ERROR_DATA:
      return {
        ...state,
        changePasswordErrorData: null,
        forgotPasswordErrorData: null,
        loginErrorData: null
      };
    default:
      return state;
  }
};

export default auth;
