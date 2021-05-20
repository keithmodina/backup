import React, { lazy } from 'react';

import {
  ROUTE_HOME,
  ROUTE_LOGIN,
  ROUTE_CREATE_PASSWORD,
  ROUTE_FORGOT_PASSWORD,
  ROUTE_RESET_PASSWORD,
  ROUTE_SERVICES,
  ROUTE_TRANSLATIONS,
  ROUTE_SETTINGS,
  ROUTE_PRIVACY_POLICY_UPDATE,
  ROUTE_PRIVACY_POLICY,
  ROUTE_PRIVACY_POLICY_NO_PUBLISHED_VERSION,
  ROUTE_PRIVACY_POLICY_LIST,
  ROUTE_PRIVACY_POLICY_VERSION_LIST,
  ROUTE_PRIVACY_POLICY_VERSION_CREATE,
  ROUTE_PRIVACY_POLICY_VERSION_UPDATE,
  ROUTE_GPP_UPDATE,
  ROUTE_GPP_CREATE,
  ROUTE_LOCATION_LANGUAGE,
  ROUTE_SETTINGS_USER
} from '../../constants/routes';

import Home from '../appHome';
import Login from '../appLogin';
import CreatePassword from '../appCreatePassword';
import ForgotPassword from '../appForgotPassword';
import ResetPassword from '../appResetPassword';

import PrivacyPolicy from '../appPrivacyPolicy';
import PrivacyPolicyDetails from '../appPrivacyPolicy/privacyPolicy';
import PrivacyPolicyVersionHistory from '../appPrivacyPolicy/versionHistory';
import PrivacyPolicyCreateVersion from '../appPrivacyPolicy/createVersion';
import Services from '../appServices';
import Translations from '../appTranslations';
import Settings from '../appSettings';
import User from '../appSettings/userDetails';
import UpdatePpDetails from '../appUpdatePpDetails';
import UpdateGppDetails from '../appUpdateGppDetails';
import CreateGppDetails from '../appCreateGppDetails';
import LocationAndLanguage from '../appLocationAndLanguage';

const AppRoutes = ({ location }) => {
  switch (location) {
    case ROUTE_HOME:
      return <Home />;
    case ROUTE_LOGIN:
      return <Login />;
    case ROUTE_CREATE_PASSWORD:
      return <CreatePassword />;
    case ROUTE_FORGOT_PASSWORD:
      return <ForgotPassword />;
    case ROUTE_RESET_PASSWORD:
      return <ResetPassword />;
    case ROUTE_PRIVACY_POLICY_LIST:
      return <PrivacyPolicy />;
    case ROUTE_LOCATION_LANGUAGE:
      return <LocationAndLanguage />;
    case ROUTE_PRIVACY_POLICY:
    case ROUTE_PRIVACY_POLICY_NO_PUBLISHED_VERSION:
      return <PrivacyPolicyDetails />;
    case ROUTE_PRIVACY_POLICY_VERSION_LIST:
      return <PrivacyPolicyVersionHistory />;
    case ROUTE_PRIVACY_POLICY_VERSION_CREATE:
      return <PrivacyPolicyCreateVersion />;
    case ROUTE_SERVICES:
      return <Services />;
    case ROUTE_TRANSLATIONS:
      return <Translations />;
    case ROUTE_SETTINGS:
      return <Settings />;
    case ROUTE_SETTINGS_USER:
      return <User />;
    case ROUTE_PRIVACY_POLICY_UPDATE:
    case ROUTE_PRIVACY_POLICY_VERSION_UPDATE:
      return <UpdatePpDetails />;
    case ROUTE_GPP_UPDATE:
      return <UpdateGppDetails />;
    case ROUTE_GPP_CREATE:
      return <CreateGppDetails />;
    default:
      return null;
  }
};

export default AppRoutes;
