import qs from 'qs';

import api from '../../utils/api';
import config from '../../constants/serverConfig';
import { actionNavigateTo } from '../common/routes';
import { ROUTE_PRIVACY_POLICY } from '../../constants/routes';
import {
  GET_PRIVACY_POLICY,
  GET_PRIVACY_POLICY_VERSION_HISTORY,
  GET_PRIVACY_POLICY_LIST,
  UPDATE_PP_DETAILS,
  CREATE_PRIVACY_POLICY_VERSION,
  DELETE_PRIVACY_POLICY,
  RESET_CREATE_VERSION_STATES,
  GET_GPP_DETAILS,
  SET_GPP_FILTERS,
  GET_PRIVACY_POLICY_VERSION
} from './index';
import {
  PENDING,
  SUCCESS,
  ERROR
} from '../../constants/statusTypes';
import {
  VERSION_SORT,
  SORT_DESCENDING
} from '../../constants/sort';
import { actionShowToast } from '../common/toast';

export const actionFetchPrivacyPolicyList = ({
  keyword = '',
  sortType = '',
  sortDir = '',
  isActiveFilter = ''
} = {}) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_PRIVACY_POLICY_LIST + PENDING });

    const queryObj = {
      keyword,
      sortType,
      sortDir,
      isActiveFilter
    };

    const queryString = qs.stringify(queryObj);

    const { data } = await api({
      method: 'GET',
      url: `${config.PRIVACY_POLICY_API_URL}/list?${queryString}`
    });

    dispatch({ type: GET_PRIVACY_POLICY_LIST + SUCCESS, payload: data.data });
  } catch (e) {
    dispatch({ type: GET_PRIVACY_POLICY_LIST + ERROR, payload: e });
  }
};

export const actionFetchPrivacyPolicyDetails = id => async dispatch => {
  try {
    dispatch({ type: GET_PRIVACY_POLICY + PENDING });
    const { data } = await api({
      method: 'GET',
      url: `${config.PRIVACY_POLICY_API_URL}/details/${id}`
    });

    dispatch({ type: GET_PRIVACY_POLICY + SUCCESS, payload: data.data });
  } catch (e) {
    dispatch({ type: GET_PRIVACY_POLICY + ERROR, payload: e });
  }
};

export const actionFetchPrivacyPolicyVersionHistory = (gpp_code, sort_by = `${VERSION_SORT}_${SORT_DESCENDING}`) => async dispatch => {
  try {
    dispatch({ type: GET_PRIVACY_POLICY_VERSION_HISTORY + PENDING });
    const { data } = await api({
      method: 'GET',
      url: `${config.PRIVACY_POLICY_API_URL}/${gpp_code}/versions?sort=${sort_by}`
    });

    dispatch({ type: GET_PRIVACY_POLICY_VERSION_HISTORY + SUCCESS, payload: data });

    return { versions: data.data, res: SUCCESS };
  } catch (e) {
    dispatch({ type: GET_PRIVACY_POLICY_VERSION_HISTORY + ERROR, e });
    return { res: ERROR };
  }
};

export const actionUpdatePpDetails = (data, id) => async dispatch => {
  try {
    dispatch({ type: UPDATE_PP_DETAILS + PENDING });
    const res = await api({
      method: 'PUT',
      url: `${config.PRIVACY_POLICY_API_URL}/details/${id}`,
      data
    });
    dispatch({ type: UPDATE_PP_DETAILS + SUCCESS, payload: res.data.data });
    if (res.status === 200) dispatch(actionNavigateTo(ROUTE_PRIVACY_POLICY, { id }));
  } catch (e) {
    dispatch({ type: UPDATE_PP_DETAILS + ERROR, payload: e });
  }
};

export const actionCreatePrivacyPolicy = details => async dispatch => {
  try {
    dispatch({ type: CREATE_PRIVACY_POLICY_VERSION + PENDING });
    dispatch(actionShowToast('Publishing new version...'));

    const { data } = await api({
      method: 'POST',
      url: `${config.PRIVACY_POLICY_API_URL}/${details.gpp}/versions`,
      data: details
    });

    dispatch({ type: CREATE_PRIVACY_POLICY_VERSION + SUCCESS, payload: data.data });
    dispatch(actionShowToast('New version successfully created.'));
  } catch (e) {
    dispatch({ type: CREATE_PRIVACY_POLICY_VERSION + ERROR, payload: e });
  }
};

export const actionDeletePrivacyPolicy = id => async dispatch => {
  try {
    dispatch({ type: DELETE_PRIVACY_POLICY + PENDING });
    const { res } = await api({
      method: 'DELETE',
      url: `${config.PRIVACY_POLICY_API_URL}/details/${id}`
    });
    dispatch({ type: DELETE_PRIVACY_POLICY + SUCCESS, payload: res });
  } catch (e) {
    dispatch({ type: DELETE_PRIVACY_POLICY + ERROR, payload: e });
  }
};

export const actionGetGppDetails = gppId => async dispatch => {
  try {
    dispatch({ type: GET_GPP_DETAILS + PENDING });
    const { data } = await api({
      method: 'GET',
      url: `${config.PRIVACY_POLICY_API_URL}/gpp/${gppId}/details`
    });
    dispatch({ type: GET_GPP_DETAILS + SUCCESS, payload: data.data });
  } catch (e) {
    dispatch({ type: GET_GPP_DETAILS + ERROR, payload: e });
  }
};

export const actionResetCreateVersionStates = () => async dispatch => {
  await dispatch({ type: RESET_CREATE_VERSION_STATES });
};

export const actionSetGppFilters = filters => async dispatch => {
  await dispatch({ type: SET_GPP_FILTERS, payload: filters });
};

export const actionGetGppVersion = params => async dispatch => {
  try {
    dispatch({ type: GET_PRIVACY_POLICY_VERSION + PENDING });
    const { data } = await api({
      method: 'GET',
      url: `${config.PRIVACY_POLICY_API_URL}/gpp/versionCheck`,
      params
    });
    dispatch({ type: GET_PRIVACY_POLICY_VERSION + SUCCESS, payload: data.data });
    return data;
  } catch (e) {
    dispatch({ type: GET_PRIVACY_POLICY_VERSION + ERROR, payload: e });
  }
};
