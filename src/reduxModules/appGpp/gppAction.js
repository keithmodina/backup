import cookie from 'js-cookie';
import api from '../../utils/api';
import config from '../../constants/serverConfig';
import {
  GET_GPP_DETAILS,
  UPDATE_GPP_DETAILS,
  GET_COUNTRY_LIST,
  GET_LANGUAGE_LIST,
  CREATE_GPP_DETAILS,
  GET_USERNAME,
  RESET_ERROR_STATE
} from './index';
import { actionNavigateTo } from '../common/routes';
import { ROUTE_LOCATION_LANGUAGE, ROUTE_HOME } from '../../constants/routes';
import {
  PENDING,
  SUCCESS,
  ERROR
} from '../../constants/statusTypes';

export const actionGetGppContent = id => async dispatch => {
  try {
    dispatch({ type: GET_GPP_DETAILS + PENDING });
    const { data } = await api({
      method: 'GET',
      url: `${config.PRIVACY_POLICY_API_URL}/gpp/${id}/details`
    });
    dispatch({ type: GET_GPP_DETAILS + SUCCESS, payload: data.data });
  } catch (e) {
    dispatch({ type: GET_GPP_DETAILS + ERROR, payload: e });
  }
};

export const actionGetGppCountryList = () => async dispatch => {
  try {
    dispatch({ type: GET_COUNTRY_LIST + PENDING });
    const { data } = await api({
      method: 'GET',
      url: `${config.PRIVACY_POLICY_API_URL}/countryList/`
    });
    dispatch({ type: GET_COUNTRY_LIST + SUCCESS, payload: data.data });
  } catch (e) {
    dispatch({ type: GET_COUNTRY_LIST + ERROR, payload: e });
  }
};

export const actionGetGppLanguageList = () => async dispatch => {
  try {
    dispatch({ type: GET_LANGUAGE_LIST + PENDING });
    const { data } = await api({
      method: 'GET',
      url: `${config.PRIVACY_POLICY_API_URL}/languageList/`
    });
    dispatch({ type: GET_LANGUAGE_LIST + SUCCESS, payload: data.data });
  } catch (e) {
    dispatch({ type: GET_LANGUAGE_LIST + ERROR, payload: e });
  }
};

export const actionUpdateGppDetails = (id, data, prevLocation) => async dispatch => {
  try {
    dispatch({ type: UPDATE_GPP_DETAILS + PENDING });
    const res = await api({
      method: 'PUT',
      url: `${config.PRIVACY_POLICY_API_URL}/gpp/${id}`,
      data
    });
    dispatch({ type: UPDATE_GPP_DETAILS + SUCCESS, payload: res.data.data });
    if (res.status === 200) dispatch(actionNavigateTo(prevLocation));
  } catch (e) {
    dispatch({ type: UPDATE_GPP_DETAILS + ERROR, payload: e });
  }
};

export const actionCreateGppDetails = data => async dispatch => {
  const USERNAME = cookie.get(GET_USERNAME);
  try {
    dispatch({ type: CREATE_GPP_DETAILS + PENDING });
    const res = await api({
      method: 'POST',
      url: `${config.PRIVACY_POLICY_API_URL}/gpp/`,
      data: { ...data, updatedBy: USERNAME, createdBy: USERNAME }
    });
    dispatch({ type: CREATE_GPP_DETAILS + SUCCESS, payload: res.data.data });
  } catch (e) {
    dispatch({ type: CREATE_GPP_DETAILS + ERROR, payload: e });
  }
};

export const actionResetErrorState = () => dispatch => {
  dispatch({ type: RESET_ERROR_STATE });
};
