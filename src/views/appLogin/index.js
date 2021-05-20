import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

import Card from '../components/Card';
import FillButton from '../components/FillButton';
import InputWithLabel from '../components/InputWithLabel';
import Text from '../components/Text';

import ImgSamsung from '../../assets/icons/common/samsung_admin.svg';

import {
  ROUTE_HOME,
  ROUTE_FORGOT_PASSWORD
} from '../../constants/routes';

import { actionNavigateTo } from '../../reduxModules/common/routes';
import {
  actionLogin,
  actionGetCurrentSession,
  actionCheckAuth
} from '../../reduxModules/common/auth';

import isEmpty from '../../utils/isEmpty';
import SvgIcon from '../components/SvgIcon';
import { actionShowToast } from '../../reduxModules/common/toast';

export const CardContainer = styled('div')({
  width: 574,
  margin: '0 auto'
});

const ButtonContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center'
});

const ErrorText = styled('div')(({ theme }) => ({
  fontSize: 14,
  color: theme.errorTextColor,
  marginBottom: 20,
  fontWeight: 500
}));

const LinksContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: 16
});

const LinkText = styled(Text)({
  fontWeight: 700
});

export const SvgIconWrapper = styled('div')({
  textAlign: 'center',
  width: '100%',
  margin: '123px auto 80px'
});

const Login = ({
  actionCheckAuth,
  actionGetCurrentSession,
  actionLogin,
  actionNavigateTo,
  actionShowToast,
  cognitoData,
  currentSession,
  location,
  loginErrorData,
  loginPending
}) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(actionCheckAuth(location));
  }, [currentSession, cognitoData]);

  useEffect(() => {
    if (!isEmpty(cognitoData)) {
      actionGetCurrentSession();
    }
  }, [cognitoData]);

  useEffect(() => {
    if (isLoggedIn) {
      actionNavigateTo(ROUTE_HOME);
    }
  }, [isLoggedIn, currentSession, cognitoData]);

  useEffect(() => {
    if (!isEmpty(loginErrorData)) {
      setError('Invalid email or password.');
    }
    if (loginPending) {
      setError('');
    }
  }, [loginErrorData, loginPending]);

  const onLoginSubmit = e => {
    e.preventDefault();
    actionLogin(credentials.username, credentials.password);
  };

  if (isLoggedIn) {
    return null;
  }

  return (
    <>
      <SvgIconWrapper>
        <SvgIcon symbol={ImgSamsung} height={40} width={446} />
      </SvgIconWrapper>
      <CardContainer>
        <Card>
          <Card.Title marginBottom={error ? 8 : 48}>Sign in with your Knox ID</Card.Title>
          <ErrorText>{error || ''}</ErrorText>
          <form onSubmit={e => onLoginSubmit(e)}>
            <Card.Row marginBottom={20}>
              <InputWithLabel
                id="knoxId"
                placeholder="Knox ID"
                autoFocus
                onChange={text => {
                  setCredentials({
                    ...credentials,
                    username: text
                  });
                }}
                minWidth={500}
                hasError={error}
              />
            </Card.Row>
            <Card.Row marginBottom={48}>
              <InputWithLabel
                type="password"
                id="password"
                placeholder="Password"
                onChange={text => {
                  setCredentials({
                    ...credentials,
                    password: text
                  });
                }}
                minWidth={500}
                hasError={error}
              />
            </Card.Row>
            <ButtonContainer>
              <FillButton type="submit" minWidth={270} disabled={loginPending}>Sign In</FillButton>
            </ButtonContainer>
            <LinksContainer>
              <LinkText clickable onClick={() => actionNavigateTo(ROUTE_FORGOT_PASSWORD)}>Forgot your password?</LinkText>
            </LinksContainer>
          </form>
        </Card>
      </CardContainer>
    </>
  );
};

export default connect(state => ({
  cognitoData: state.common.auth.cognitoData,
  currentSession: state.common.auth.currentSession,
  location: state.location,
  loginErrorData: state.common.auth.loginErrorData,
  loginPending: state.common.auth.loginPending
}), {
  actionCheckAuth,
  actionNavigateTo,
  actionLogin,
  actionGetCurrentSession,
  actionShowToast
})(Login);
