import {
  GET_GPP_DETAILS,
  UPDATE_GPP_DETAILS,
  GET_LANGUAGE_LIST,
  GET_COUNTRY_LIST,
  CREATE_GPP_DETAILS,
  RESET_ERROR_STATE
} from './index';
import {
  PENDING,
  SUCCESS,
  ERROR
} from '../../constants/statusTypes';

const initialState = {
  gppDetails: [],
  countryList: [],
  languageList: [],
  isFetchingDetails: false,
  isUpdating: false,
  isFetchingError: false,
  isCreatingDetails: false,
  isCreatingError: false,
  isCreatedDetails: false
};

const gpp = (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_GPP_DETAILS + PENDING:
      return {
        ...state,
        isFetchingDetails: true
      };
    case GET_GPP_DETAILS + SUCCESS:
      return {
        ...state,
        isFetchingDetails: false,
        gppDetails: action.payload,
        isFetchingError: false
      };
    case GET_GPP_DETAILS + ERROR:
      return {
        ...state,
        isFetchingDetails: false,
        isFetchingError: true
      };
    case GET_LANGUAGE_LIST + PENDING:
      return {
        ...state,
        isFetchingDetails: true
      };
    case GET_LANGUAGE_LIST + SUCCESS:
      return {
        ...state,
        isFetchingDetails: false,
        languageList: action.payload
      };
    case GET_LANGUAGE_LIST + ERROR:
      return {
        ...state,
        isFetchingDetails: false,
        isFetchingError: true
      };
    case GET_COUNTRY_LIST + PENDING:
      return {
        ...state,
        isFetchingDetails: true
      };
    case GET_COUNTRY_LIST + SUCCESS:
      return {
        ...state,
        isFetchingDetails: false,
        countryList: action.payload
      };
    case GET_COUNTRY_LIST + ERROR:
      return {
        ...state,
        isFetchingDetails: false,
        isFetchingError: true
      };
    case UPDATE_GPP_DETAILS + PENDING:
      return {
        ...state,
        isUpdating: true,
        isCreatedDetails: false
      };
    case UPDATE_GPP_DETAILS + SUCCESS:
      return {
        ...state,
        isUpdating: false,
        gppDetails: action.payload,
        isCreatedDetails: false
      };
    case UPDATE_GPP_DETAILS + ERROR:
      return {
        ...state,
        isUpdating: false,
        isFetchingError: true
      };
    case CREATE_GPP_DETAILS + PENDING:
      return {
        ...state,
        isCreatingDetails: true,
        isCreatedDetails: false
      };
    case CREATE_GPP_DETAILS + SUCCESS:
      return {
        ...state,
        isCreatingDetails: false,
        isCreatedDetails: true,
        gppDetails: action.payload
      };
    case CREATE_GPP_DETAILS + ERROR:
      return {
        ...state,
        isCreatingDetails: false,
        isCreatingError: true
      };
    case RESET_ERROR_STATE:
      return {
        ...state,
        isCreatingError: false,
        isCreatedDetails: false
      };
    default:
      return state;
  }
};

export default gpp;
