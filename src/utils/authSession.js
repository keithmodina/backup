import cookie from 'js-cookie';
import { redirect, NOT_FOUND } from 'redux-first-router';

import {
  ROUTE_LOGIN,
  ROUTE_ERROR_400,
  ROUTE_ERROR_403,
  ROUTE_ERROR_404,
  ROUTE_ERROR_500,
  ROUTE_ERROR_502,
  ROUTE_ERROR_503
} from '../constants/routes';

import { clearStorage } from './storage';

import {
  ACCESS_TOKEN,
  ID_TOKEN,
  REFRESH_TOKEN,
  USERNAME
} from '../constants/storage';
// import { actionGetCurrentSession } from '../reduxModules/common/auth';

export const checkAuth = (dispatch, action) => {
  let allowed = false;

  if (cookie.get(ACCESS_TOKEN) && cookie.get(ID_TOKEN) && cookie.get(REFRESH_TOKEN)) {
    allowed = true;
  } else {
    allowed = false;
  }

  if (action.type !== NOT_FOUND
    && action.type !== ROUTE_LOGIN
    && action.type !== ROUTE_ERROR_400
    && action.type !== ROUTE_ERROR_403
    && action.type !== ROUTE_ERROR_404
    && action.type !== ROUTE_ERROR_500
    && action.type !== ROUTE_ERROR_502
    && action.type !== ROUTE_ERROR_503
  ) {
    if (!allowed) {
      clearStorage();
      dispatch(redirect({ type: ROUTE_LOGIN }));
    }
  }
  return allowed;
};
