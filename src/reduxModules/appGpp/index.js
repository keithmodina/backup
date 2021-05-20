import gpp from './gpp';
import {
  actionGetGppCountryList,
  actionGetGppLanguageList,
  actionUpdateGppDetails,
  actionGetGppContent,
  actionCreateGppDetails,
  actionResetErrorState
} from './gppAction';

export const GET_USERNAME = 'username';
export const GET_GPP_DETAILS = '[gpp] GET_GPP_DETAILS';
export const UPDATE_GPP_DETAILS = '[gpp] UPDATE_GPP_DETAILS';
export const GET_LANGUAGE_LIST = '[gpp] GET_LANGUAGE_LIST';
export const GET_COUNTRY_LIST = '[gpp] GET_COUNTRY_LIST';
export const CREATE_GPP_DETAILS = '[gpp] CREATE_GPP_DETAILS';
export const RESET_ERROR_STATE = '[gpp] RESET_ERROR_STATE';

export {
  actionGetGppContent,
  actionGetGppCountryList,
  actionGetGppLanguageList,
  actionUpdateGppDetails,
  actionCreateGppDetails,
  actionResetErrorState
};

export default gpp;
