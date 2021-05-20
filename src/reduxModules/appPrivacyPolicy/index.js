import privacypolicy from './privacyPolicy';

export const GET_PRIVACY_POLICY_LIST = '[privacy_policy] GET_PRIVACY_POLICY_LIST';
export const GET_PRIVACY_POLICY = '[privacy_policy] GET_PRIVACY_POLICY';
export const UPDATE_PP_DETAILS = '[privacy_policy] UPDATE_PP_DETAILS';
export const DELETE_PRIVACY_POLICY = '[privacy_policy] DELETE_PRIVACY_POLICY';
export const GET_GPP_DETAILS = '[privacy_policy] GET_GPP_DETAILS';
export const GET_PRIVACY_POLICY_VERSION_HISTORY = '[privacy_policy] GET_PRIVACY_POLICY_VERSION_HISTORY';
export const CREATE_PRIVACY_POLICY_VERSION = '[privacy_policy] CREATE_PRIVACY_POLICY_VERSION';
export const RESET_CREATE_VERSION_STATES = '[privacy_policy] RESET_CREATE_VERSION_STATES';
export const SET_GPP_FILTERS = '[privacy_policy] SET_GPP_FILTERS';
export const GET_PRIVACY_POLICY_VERSION = '[privacy_policy] GET_PRIVACY_POLICY_VERSION';

export {
  actionFetchPrivacyPolicyList,
  actionFetchPrivacyPolicyDetails,
  actionUpdatePpDetails,
  actionFetchPrivacyPolicyVersionHistory,
  actionCreatePrivacyPolicy,
  actionDeletePrivacyPolicy,
  actionResetCreateVersionStates,
  actionGetGppDetails,
  actionSetGppFilters,
  actionGetGppVersion
} from './privacyPolicyActions';

export default privacypolicy;
