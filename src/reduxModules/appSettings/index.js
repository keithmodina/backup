import settings from './settings';

export const GET_USER_DETAILS = '[settings] GET_USER_DETAILS';
export const GET_USER_LIST = '[settings] GET_USER_LIST';
export const SET_USER_FILTERS = '[settings] SET_USER_FILTERS';
export {
  actionGetUserDetails,
  actionFetchUserList,
  actionSetUserFilter
} from './settingsActions';

export default settings;
