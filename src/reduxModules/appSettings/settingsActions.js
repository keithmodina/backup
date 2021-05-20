import qs from 'qs';

import api from '../../utils/api';
import config from '../../constants/serverConfig';
import {
  GET_USER_DETAILS,
  GET_USER_LIST,
  SET_USER_FILTERS
} from './index';
import {
  PENDING,
  SUCCESS,
  ERROR
} from '../../constants/statusTypes';

export const actionGetUserDetails = id => async dispatch => {
  try {
    dispatch({ type: GET_USER_DETAILS + PENDING });
    const { data } = await api({
      method: 'GET',
      url: `${config.USER_API_URL}/${id}`
    });

    dispatch({ type: GET_USER_DETAILS + SUCCESS, payload: data.data });
  } catch (e) {
    dispatch({ type: GET_USER_DETAILS + ERROR, payload: e });
  }
};

export const actionFetchUserList = ({
  keyword = '',
  sortType = '',
  sortDir = '',
  isActiveFilter = ''
} = {}) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_USER_LIST + PENDING });

    const queryObj = {
      keyword,
      sortType,
      sortDir,
      isActiveFilter
    };

    const queryString = qs.stringify(queryObj);

    const { data } = await api({
      method: 'GET',
      url: `${config.USER_API_URL}/list?${queryString}`
    });

    dispatch({ type: GET_USER_LIST + SUCCESS, payload: data.data });
  } catch (e) {
    dispatch({ type: GET_USER_LIST + ERROR, payload: e });
  }
};

export const actionSetUserFilter = filters => async dispatch => {
  await dispatch({ type: SET_USER_FILTERS, payload: filters });
};
