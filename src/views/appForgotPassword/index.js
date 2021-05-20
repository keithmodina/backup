import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

import Card from '../components/Card';
import FillButton from '../components/FillButton';
import InputWithLabel from '../components/InputWithLabel';
import Text from '../components/Text';
import SvgIcon from '../components/SvgIcon';

import { ROUTE_LOGIN, ROUTE_RESET_PASSWORD } from '../../constants/routes';

import { actionNavigateTo } from '../../reduxModules/common/routes';
import { actionForgotPassword } from '../../reduxModules/common/auth';
import ImgSamsung from '../../assets/icons/common/samsung_admin.svg';

import { CardContainer } from '../appLogin';

const ButtonContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center'
});

const SubtitleText = styled('div')(({ theme, isError }) => ({
  fontSize: 14,
  color: isError ? theme.errorTextColor : theme.primaryTextColor,
  marginBottom: isError ? 20 : 23,
  fontWeight: 500
}));

const LinksContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: 20
});

const LinkText = styled(Text)({
  fontWeight: 700
});

const SvgIconWrapper = styled('div')({
  textAlign: 'center',
  width: '100%',
  margin: '123px auto 80px'
});

const ForgotPassword = ({
  actionNavigateTo,
  actionForgotPassword,
  codeDelivery,
  forgotPasswordErrorData
}) => {
  const [state, setState] = useState({ knoxId: null });
  const [error, setError] = useState('');

  useEffect(() => {
    if (codeDelivery.AttributeName) {
      actionNavigateTo(ROUTE_RESET_PASSWORD);
    }
  }, [codeDelivery]);

  useEffect(() => {
    if (forgotPasswordErrorData) {
      setError('No user is registered with that email.');
    }
  }, [forgotPasswordErrorData]);

  const onSubmit = e => {
    e.preventDefault();
    actionForgotPassword(state.knoxId);
  };

  return (
    <>
      <SvgIconWrapper>
        <SvgIcon symbol={ImgSamsung} height={40} width={446} />
      </SvgIconWrapper>
      <CardContainer>
        <Card>
          <Card.Title marginBottom={16}>Forgot Password</Card.Title>
          <SubtitleText isError={error}>{error || 'Please enter your Knox ID and we’ll send you recovery instructions.'}</SubtitleText>
          <form onSubmit={e => onSubmit(e)}>
            <Card.Row marginBottom={48}>
              <InputWithLabel
                id="knoxId"
                placeholder="Knox ID"
                autoFocus
                onChange={text => {
                  setState({
                    ...state,
                    knoxId: text
                  });
                }}
                minWidth={500}
                hasError={error}
              />
            </Card.Row>
            <ButtonContainer>
              <FillButton type="submit">Submit</FillButton>
            </ButtonContainer>
          </form>
        </Card>
      </CardContainer>
      <LinksContainer>
        <LinkText clickable onClick={() => actionNavigateTo(ROUTE_LOGIN)}>Back to sign in</LinkText>
      </LinksContainer>
    </>
  );
};

export default connect(state => ({
  codeDelivery: state.common.auth.codeDelivery,
  forgotPasswordErrorData: state.common.auth.forgotPasswordErrorData
}), {
  actionNavigateTo,
  actionForgotPassword
})(ForgotPassword);
