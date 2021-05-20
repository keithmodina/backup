import {
  GET_PRIVACY_POLICY,
  GET_PRIVACY_POLICY_VERSION_HISTORY,
  GET_PRIVACY_POLICY_LIST,
  UPDATE_PP_DETAILS,
  CREATE_PRIVACY_POLICY_VERSION,
  DELETE_PRIVACY_POLICY,
  RESET_CREATE_VERSION_STATES,
  GET_GPP_DETAILS,
  SET_GPP_FILTERS
} from './index';
import {
  PENDING,
  SUCCESS,
  ERROR
} from '../../constants/statusTypes';

const initialState = {
  privacyPolicy: {},
  gppDetails: {},
  privacyPolicyList: [],
  privacyPolicyListErrorData: {},
  isfetchPrivacyPolicyListPending: false,
  isfetchPrivacyPolicyListSuccess: false,
  isfetchPrivacyPolicyListError: false,
  privacyPolicyVersionHistory: {},
  isPpVersionHistoryListPending: false,
  isUpdatePpDetailsPending: false,
  isUpdatePpDetailsError: false,
  privacyPolicyDetails: {},
  isFetchingPrivacyPolicy: false,
  newVersionId: '',
  isCreatePrivacyPolicyPending: true,
  isCreatePrivacyPolicyError: false,
  isPrivacyPolicyDeletePending: false,
  isPrivacyPolicyDeleteSuccess: false,
  isPrivacyPolicyDeleteError: false,
  isGetGppDetailsPending: false,
  isGetGppDetailsSuccess: false,
  isGetGppDetailsError: false,
  gppFilter: {}
};

const privacypolicy = (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_PRIVACY_POLICY_LIST + PENDING:
      return {
        ...state,
        isfetchPrivacyPolicyListPending: true
      };
    case GET_PRIVACY_POLICY_LIST + SUCCESS:
      return {
        ...state,
        isfetchPrivacyPolicyListPending: false,
        isfetchPrivacyPolicyListSuccess: true,
        privacyPolicyList: action.payload
      };
    case GET_PRIVACY_POLICY_LIST + ERROR:
      return {
        ...state,
        isfetchPrivacyPolicyListPending: false,
        isfetchPrivacyPolicyListError: true,
        privacyPolicyListErrorData: action.payload
      };
    case GET_PRIVACY_POLICY_VERSION_HISTORY + PENDING:
      return {
        ...state,
        privacyPolicyVersionHistory: {},
        isPpVersionHistoryListPending: true
      };
    case GET_PRIVACY_POLICY_VERSION_HISTORY + SUCCESS:
      return {
        ...state,
        privacyPolicyVersionHistory: action.payload,
        isPpVersionHistoryListPending: false
      };
    case GET_PRIVACY_POLICY + PENDING:
      return {
        ...state,
        isFetchingPrivacyPolicy: true,
        isUpdatePpDetailsPending: false
      };
    case GET_PRIVACY_POLICY + SUCCESS:
      return {
        ...state,
        isFetchingPrivacyPolicy: false,
        privacyPolicyDetails: action.payload,
        isUpdatePpDetailsPending: false
      };
    case GET_PRIVACY_POLICY + ERROR:
      return {
        ...state,
        isFetchingPrivacyPolicy: false,
        privacyPolicyDetails: {},
        error: action.payload
      };
    case UPDATE_PP_DETAILS + PENDING:
      return {
        ...state,
        isUpdatePpDetailsPending: true
      };
    case UPDATE_PP_DETAILS + SUCCESS:
      return {
        ...state,
        isUpdatePpDetailsPending: false,
        privacyPolicyDetails: action.payload,
        isUpdatePpDetailsError: false
      };
    case UPDATE_PP_DETAILS + ERROR:
      return {
        ...state,
        isUpdatePpDetailsPending: false,
        error: action.payload,
        isUpdatePpDetailsError: true
      };
    case CREATE_PRIVACY_POLICY_VERSION + PENDING:
      return {
        ...state,
        isCreatePrivacyPolicyPending: true,
        isCreatePrivacyPolicyError: false
      };
    case CREATE_PRIVACY_POLICY_VERSION + SUCCESS:
      return {
        ...state,
        newVersionId: action.payload.id,
        isCreatePrivacyPolicyPending: false,
        isCreatePrivacyPolicyError: false
      };
    case CREATE_PRIVACY_POLICY_VERSION + ERROR:
      return {
        ...state,
        isCreatePrivacyPolicyPending: false,
        isCreatePrivacyPolicyError: true,
        error: action.payload
      };
    case DELETE_PRIVACY_POLICY + PENDING:
      return {
        ...state,
        isPrivacyPolicyDeletePending: true
      };
    case DELETE_PRIVACY_POLICY + SUCCESS:
      return {
        ...state,
        isPrivacyPolicyDeleteSuccess: true,
        isPrivacyPolicyDeletePending: false
      };
    case DELETE_PRIVACY_POLICY + ERROR:
      return {
        ...state,
        isPrivacyPolicyDeletePending: false,
        isPrivacyPolicyDeleteError: true
      };
    case RESET_CREATE_VERSION_STATES:
      return {
        ...state,
        newVersionId: '',
        isCreatePrivacyPolicyPending: true,
        isCreatePrivacyPolicyError: false,
        privacyPolicyDetails: {}
      };
    case GET_GPP_DETAILS + PENDING:
      return {
        ...state,
        isGetGppDetailsPending: true
      };
    case GET_GPP_DETAILS + SUCCESS:
      return {
        ...state,
        isGetGppDetailsSuccess: true,
        isGetGppDetailsPending: false,
        gppDetails: action.payload
      };
    case GET_GPP_DETAILS + ERROR:
      return {
        ...state,
        isGetGppDetailsPending: false,
        isGetGppDetailsError: true
      };
    case SET_GPP_FILTERS:
      return {
        ...state,
        gppFilter: action.payload
      };
    default:
      return state;
  }
};

export default privacypolicy;
