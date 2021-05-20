import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { actionNavigateTo } from '../../reduxModules/common/routes';
import { actionCheckAuth } from '../../reduxModules/common/auth';

import { ROUTE_PRIVACY_POLICY_LIST } from '../../constants/routes';

const Home = ({
  actionCheckAuth,
  actionNavigateTo,
  location
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(actionCheckAuth(location));
  }, [location]);

  useEffect(() => {
    if (isLoggedIn) {
      actionNavigateTo(ROUTE_PRIVACY_POLICY_LIST);
    }
  }, [isLoggedIn]);

  return null;
};

export default connect(state => ({
  location: state.location
  // userData: state.common.user.data
}), {
  actionCheckAuth,
  actionNavigateTo
})(Home);
