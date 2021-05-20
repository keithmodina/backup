import React, {
  lazy,
  Suspense
} from 'react';
import { connect } from 'react-redux';
import { NOT_FOUND } from 'redux-first-router';

import {
  ROUTE_CHANGE_PASSWORD,
  ROUTE_CREATE_PASSWORD,
  ROUTE_ERROR_400,
  ROUTE_ERROR_403,
  ROUTE_ERROR_404,
  ROUTE_ERROR_500,
  ROUTE_ERROR_502,
  ROUTE_ERROR_503,
  ROUTE_FORGOT_PASSWORD,
  ROUTE_HOME,
  ROUTE_LOGIN,
  ROUTE_PRIVACY_POLICY_LIST,
  ROUTE_RESET_PASSWORD,
  ROUTE_SERVICES,
  ROUTE_SETTINGS,
  ROUTE_TRANSLATIONS,
  ROUTE_PRIVACY_POLICY_UPDATE,
  ROUTE_PRIVACY_POLICY_VERSION_LIST,
  ROUTE_GPP_UPDATE,
  ROUTE_PRIVACY_POLICY_VERSION_CREATE,
  ROUTE_PRIVACY_POLICY,
  ROUTE_PRIVACY_POLICY_NO_PUBLISHED_VERSION,
  ROUTE_PRIVACY_POLICY_VERSION_UPDATE,
  ROUTE_GPP_CREATE,
  ROUTE_LOCATION_LANGUAGE,
  ROUTE_SETTINGS_USER
} from '../../constants/routes';
import {
  error400,
  error403,
  error404,
  error500,
  error502,
  error503
} from '../../constants/pageErrorTypes';

const EntryRoot = lazy(() => import('./EntryRoot'));
const ViewRoot = lazy(() => import('./ViewRoot'));
const Error = lazy(() => import('../components/Error'));
const ToastRoot = lazy(() => import('./ToastRoot'));
const DialogRoot = lazy(() => import('./DialogRoot'));

const AppRoot = ({
  locationType
}) => {
  const viewLayouts = () => (
    <Suspense fallback={<div />}>
      <ViewRoot location={locationType} />
      <DialogRoot />
      <ToastRoot />
    </Suspense>
  );

  const entryLayouts = () => (
    <Suspense fallback={<div />}>
      <EntryRoot location={locationType} />
      <DialogRoot />
      <ToastRoot />
    </Suspense>
  );

  const ErrorPage = errorType => (
    <Suspense fallback={<div />}>
      <Error errorType={errorType} />
    </Suspense>
  );

  const routes = () => {
    switch (locationType) {
      // add component in views/layouts/AppRoutes
      case ROUTE_LOGIN:
      case ROUTE_HOME:
      case ROUTE_CREATE_PASSWORD:
      case ROUTE_FORGOT_PASSWORD:
      case ROUTE_RESET_PASSWORD:
        return entryLayouts();
      case ROUTE_PRIVACY_POLICY_LIST:
      case ROUTE_SERVICES:
      case ROUTE_SETTINGS:
      case ROUTE_TRANSLATIONS:
      case ROUTE_PRIVACY_POLICY_UPDATE:
      case ROUTE_PRIVACY_POLICY:
      case ROUTE_PRIVACY_POLICY_NO_PUBLISHED_VERSION:
      case ROUTE_PRIVACY_POLICY_VERSION_LIST:
      case ROUTE_GPP_UPDATE:
      case ROUTE_GPP_CREATE:
      case ROUTE_PRIVACY_POLICY_VERSION_CREATE:
      case ROUTE_PRIVACY_POLICY_VERSION_UPDATE:
      case ROUTE_LOCATION_LANGUAGE:
      case ROUTE_SETTINGS_USER:
        return viewLayouts();
      case ROUTE_ERROR_400:
        return ErrorPage(error400);
      case ROUTE_ERROR_403:
        return ErrorPage(error403);
      case ROUTE_ERROR_404:
      case NOT_FOUND:
        return ErrorPage(error404);
      case ROUTE_ERROR_500:
        return ErrorPage(error500);
      case ROUTE_ERROR_502:
        return ErrorPage(error502);
      case ROUTE_ERROR_503:
        return ErrorPage(error503);
      default:
        return null;
    }
  };

  return routes();
};

export default connect(state => ({
  locationType: state.location.type
}))(AppRoot);
