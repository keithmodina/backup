import cookie from 'js-cookie';
import { Auth } from '../../../utils/awsAmplify';
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

import {
  ID_TOKEN,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  USERNAME,
  EMAIL,
  FULL_NAME
} from '../../../constants/storage';

import { clearStorage } from '../../../utils/storage';
import { checkAuth } from '../../../utils/authSession';
import { removeWhiteSpace } from '../../../utils/stringManip';
import { actionNavigateTo } from '../routes';
import { ROUTE_CREATE_PASSWORD, ROUTE_HOME } from '../../../constants/routes';
import { actionShowToast } from '../toast';

export const actionLogin = (username, password) => async dispatch => {
  try {
    dispatch({ type: LOGIN + PENDING });
    const resultData = await Auth.signIn(removeWhiteSpace(username), password);

    if (resultData.challengeName === 'NEW_PASSWORD_REQUIRED') {
      const { requiredAttributes } = resultData.challengeParam;
      dispatch({ type: CREATE_NEW_PASSWORD_FIRST_TIME_LOGIN + PENDING, payload: resultData });
      dispatch(actionNavigateTo(ROUTE_CREATE_PASSWORD));
    } else {
      const { signInUserSession, attributes } = resultData;

      cookie.set(ID_TOKEN, signInUserSession.idToken.jwtToken, { expires: 30 });
      cookie.set(ACCESS_TOKEN, signInUserSession.accessToken.jwtToken, { expires: 30 });
      cookie.set(REFRESH_TOKEN, signInUserSession.refreshToken.token, { expires: 30 });
      cookie.set(USERNAME, signInUserSession.accessToken.payload.username, { expires: 30 });

      cookie.set(EMAIL, attributes.email, { expires: 30 });
      cookie.set(FULL_NAME, `${attributes.given_name} ${attributes.family_name}`, { expires: 30 });
      dispatch({ type: LOGIN + SUCCESS, payload: resultData });
    }
  } catch (e) {
    dispatch({ type: LOGIN + ERROR, payload: e });
  }
};

export const actionCompleteNewPassword = ({ credentials }) => async (dispatch, getState) => {
  try {
    const { firstTimeLoginData: user } = getState().common.auth;
    const { password, givenName, familyName } = credentials;

    const resultData = await Auth.completeNewPassword(
      user,
      password,
      {
        given_name: givenName,
        family_name: familyName
      }
    );
    dispatch({ type: CREATE_NEW_PASSWORD_FIRST_TIME_LOGIN + SUCCESS, payload: resultData });

    dispatch(actionShowToast('Information successfully saved. Please log in again.'));
    setTimeout(() => {
      dispatch(actionLogout());
    }, 3000);
  } catch (e) {
    dispatch({ type: CREATE_NEW_PASSWORD_FIRST_TIME_LOGIN + ERROR, payload: e });
  }
};

export const actionForgotPassword = username => async dispatch => {
  try {
    dispatch({ type: FORGOT_PASSWORD + PENDING });
    const resultData = await Auth.forgotPassword(removeWhiteSpace(username));
    const newPayload = resultData.CodeDeliveryDetails;
    dispatch({ type: FORGOT_PASSWORD + SUCCESS, payload: { ...newPayload, username } });
  } catch (e) {
    dispatch({ type: FORGOT_PASSWORD + ERROR, payload: e });
  }
};

export const actionForgotPasswordSubmit = (username, password, code) => async dispatch => {
  try {
    dispatch({ type: CHANGE_PASSWORD + PENDING });
    const resultData = await Auth.forgotPasswordSubmit(username, code, password);
    dispatch({ type: CHANGE_PASSWORD + SUCCESS, payload: resultData });

    dispatch(actionShowToast('Your password has been changed successfully. Please log in again.'));
    setTimeout(() => {
      dispatch(actionLogout());
    }, 3000);
  } catch (e) {
    dispatch({ type: CHANGE_PASSWORD + ERROR, payload: e });
  }
};

export const actionGetCurrentSession = () => async dispatch => {
  try {
    dispatch({ type: GET_CURRENT_SESSION + PENDING });
    const resultData = await Auth.currentSession();
    dispatch({ type: GET_CURRENT_SESSION + SUCCESS, payload: resultData });
    const { idToken, accessToken, refreshToken } = resultData;
    cookie.set(ID_TOKEN, idToken.jwtToken, { expires: 30 });
    cookie.set(ACCESS_TOKEN, accessToken.jwtToken, { expires: 30 });
    cookie.set(REFRESH_TOKEN, refreshToken.token, { expires: 30 });
  } catch (e) {
    dispatch({ type: GET_CURRENT_SESSION + ERROR, payload: e });
  }
};

export const actionCheckAuth = location => (dispatch, getState) => {
  const isLoggedIn = checkAuth(dispatch, { type: location.type });
  return isLoggedIn;
};

export const actionLogout = () => async dispatch => {
  clearStorage();
  window.location.replace('');
};

export const actionClearErrorData = () => async dispatch => {
  dispatch({ type: CLEAR_ERROR_DATA });
};
