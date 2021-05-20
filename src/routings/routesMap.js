import cookie from 'js-cookie';

import combineThunks from '../utils/combineThunks';
import {
  ROUTE_CREATE_PASSWORD,
  ROUTE_FORGOT_PASSWORD,
  ROUTE_HOME,
  ROUTE_LOGIN,
  ROUTE_PRIVACY_POLICY,
  ROUTE_PRIVACY_POLICY_NO_PUBLISHED_VERSION,
  ROUTE_PRIVACY_POLICY_CREATE,
  ROUTE_PRIVACY_POLICY_LIST,
  ROUTE_PRIVACY_POLICY_UPDATE,
  ROUTE_PRIVACY_POLICY_VERSION_LIST,
  ROUTE_PRIVACY_POLICY_VERSION_CREATE,
  ROUTE_PRIVACY_POLICY_VERSION_UPDATE,
  ROUTE_RESET_PASSWORD,
  ROUTE_SERVICES,
  ROUTE_SETTINGS,
  ROUTE_GPP_UPDATE,
  ROUTE_GPP_CREATE,
  ROUTE_TRANSLATIONS,
  ROUTE_LOCATION_LANGUAGE,
  ROUTE_SETTINGS_USER
} from '../constants/routes';
import {
  actionGetCurrentSession,
  actionCheckAuth,
  actionClearErrorData
} from '../reduxModules/common/auth';
import { actionSetActiveTab } from '../reduxModules/common/sidebar';
import {
  actionFetchPrivacyPolicyVersionHistory,
  actionFetchPrivacyPolicyDetails,
  actionResetCreateVersionStates,
  actionGetGppDetails
} from '../reduxModules/appPrivacyPolicy';
import {
  actionGetUserDetails,
  actionFetchUserList
} from '../reduxModules/appSettings';
import {
  actionGetGppContent,
  actionGetGppCountryList,
  actionGetGppLanguageList,
  actionResetErrorState
} from '../reduxModules/appGpp';
import { USERNAME } from '../constants/storage';

const handlePageSwitch = () => async (dispatch, getState) => {
  await dispatch(actionResetCreateVersionStates());
  await dispatch(actionGetCurrentSession());
  const isLoggedIn = dispatch(actionCheckAuth(getState().location));

  const username = cookie.get(USERNAME) || '';
  if (username) {
    // dispatch(actionGetUser(username));
  }
};

const handleFetchData = ({ page } = {}) => async (dispatch, getState) => {
  const { location } = getState();

  switch (page) {
    case ROUTE_PRIVACY_POLICY_VERSION_LIST:
      dispatch(actionFetchPrivacyPolicyVersionHistory(location.payload.id));
      break;
    case ROUTE_PRIVACY_POLICY_UPDATE:
    case ROUTE_PRIVACY_POLICY_VERSION_UPDATE:
      dispatch(actionFetchPrivacyPolicyDetails(location.payload.id));
      break;
    case ROUTE_GPP_UPDATE:
      dispatch(actionGetGppContent(location.payload.id));
      dispatch(actionGetGppCountryList());
      dispatch(actionGetGppLanguageList());
      break;
    case ROUTE_GPP_CREATE:
      dispatch(actionGetGppCountryList());
      dispatch(actionGetGppLanguageList());
      dispatch(actionResetErrorState());
      break;
    case ROUTE_PRIVACY_POLICY_VERSION_CREATE:
      dispatch(actionResetErrorState());
      await dispatch(actionGetGppDetails(location.payload.id));
      break;
    case ROUTE_SETTINGS_USER:
      await dispatch(actionGetUserDetails(location.payload.id));
      break;
    case ROUTE_SETTINGS:
      await dispatch(actionFetchUserList(location.payload.id));
      break;
    default:
      break;
  }
};

const routesMap = {
  [ROUTE_HOME]: {
    path: '/',
    thunk: combineThunks(
      handlePageSwitch()
    )
  },
  [ROUTE_LOGIN]: {
    path: '/login',
    thunk: combineThunks(
      actionGetCurrentSession()
    )
  },
  [ROUTE_CREATE_PASSWORD]: {
    path: '/create-password',
    thunk: combineThunks(
      actionClearErrorData()
    )
  },
  [ROUTE_FORGOT_PASSWORD]: {
    path: '/forgot-password',
    thunk: combineThunks(
      actionClearErrorData()
    )
  },
  [ROUTE_RESET_PASSWORD]: {
    path: '/reset-password',
    thunk: combineThunks(
      actionClearErrorData()
    )
  },
  [ROUTE_PRIVACY_POLICY_LIST]: {
    path: '/privacy-policy',
    thunk: combineThunks(
      actionSetActiveTab(0),
      handlePageSwitch()
    )
  },
  [ROUTE_LOCATION_LANGUAGE]: {
    path: '/location-language/',
    thunk: combineThunks(
      actionSetActiveTab(1),
      handlePageSwitch(),
      handleFetchData({ page: ROUTE_LOCATION_LANGUAGE })
    )
  },
  [ROUTE_SERVICES]: {
    path: '/services',
    thunk: combineThunks(
      actionSetActiveTab(2),
      handlePageSwitch()
    )
  },
  [ROUTE_TRANSLATIONS]: {
    path: '/translations',
    thunk: combineThunks(
      actionSetActiveTab(3),
      handlePageSwitch()
    )
  },
  [ROUTE_SETTINGS]: {
    path: '/settings',
    thunk: combineThunks(
      actionSetActiveTab(4),
      handlePageSwitch(),
      handleFetchData({ page: ROUTE_SETTINGS })
    )
  },
  [ROUTE_PRIVACY_POLICY_NO_PUBLISHED_VERSION]: {
    path: '/privacy-policy/no-published-version',
    thunk: combineThunks(
      actionSetActiveTab(0),
      handlePageSwitch()
    )
  },
  [ROUTE_PRIVACY_POLICY]: {
    path: '/privacy-policy/:id',
    thunk: combineThunks(
      actionSetActiveTab(0),
      handlePageSwitch()
    )
  },
  [ROUTE_PRIVACY_POLICY_CREATE]: {
    path: '/privacy-policy/create',
    thunk: combineThunks(
      actionSetActiveTab(0),
      handlePageSwitch()
    )
  },
  [ROUTE_PRIVACY_POLICY_UPDATE]: {
    path: '/privacy-policy/update/:id',
    thunk: combineThunks(
      actionSetActiveTab(0),
      handlePageSwitch(),
      handleFetchData({ page: ROUTE_PRIVACY_POLICY_UPDATE })
    )
  },
  [ROUTE_PRIVACY_POLICY_VERSION_LIST]: {
    path: '/privacy-policy/versions/:id',
    thunk: combineThunks(
      actionSetActiveTab(0),
      handlePageSwitch(),
      handleFetchData({ page: ROUTE_PRIVACY_POLICY_VERSION_LIST })
    )
  },
  [ROUTE_PRIVACY_POLICY_VERSION_CREATE]: {
    path: '/privacy-policy/versions/:id/create',
    thunk: combineThunks(
      actionSetActiveTab(0),
      handlePageSwitch(),
      handleFetchData({ page: ROUTE_PRIVACY_POLICY_VERSION_CREATE })
    )
  },
  [ROUTE_PRIVACY_POLICY_VERSION_UPDATE]: {
    path: '/privacy-policy/versions/update/:id',
    thunk: combineThunks(
      actionSetActiveTab(0),
      handlePageSwitch(),
      handleFetchData({ page: ROUTE_PRIVACY_POLICY_VERSION_UPDATE })
    )
  },
  [ROUTE_GPP_UPDATE]: {
    path: '/location-language/update/:id',
    thunk: combineThunks(
      actionSetActiveTab(0),
      handlePageSwitch(),
      handleFetchData({ page: ROUTE_GPP_UPDATE })
    )
  },
  [ROUTE_GPP_CREATE]: {
    path: '/location-language/create',
    thunk: combineThunks(
      actionSetActiveTab(0),
      handlePageSwitch(),
      handleFetchData({ page: ROUTE_GPP_CREATE })
    )
  },
  [ROUTE_SETTINGS_USER]: {
    path: '/settings/user/:id',
    thunk: combineThunks(
      actionSetActiveTab(4),
      handlePageSwitch(),
      handleFetchData({ page: ROUTE_SETTINGS_USER })
    )
  }
};

export default routesMap;
