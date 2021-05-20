import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

import Card from '../components/Card';
import FillButton from '../components/FillButton';
import InputWithLabel from '../components/InputWithLabel';
import SvgIcon from '../components/SvgIcon';

import ImgSamsung from '../../assets/icons/common/samsung_admin.svg';

import { actionForgotPasswordSubmit } from '../../reduxModules/common/auth';

import isEmpty from '../../utils/isEmpty';

import { CardContainer } from '../appLogin';
import Text from '../components/Text';

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

const SvgIconWrapper = styled('div')({
  textAlign: 'center',
  width: '100%',
  margin: '123px auto 80px'
});

const ResetPassword = ({
  actionForgotPasswordSubmit,
  changePasswordErrorData,
  codeDelivery
}) => {
  const [credentials, setCredentials] = useState({ password: null, confirmPassword: null, code: null });
  const [error, setError] = useState('');
  const [errorObj, setErrorObj] = useState({ code: false, password: false, confirmPassword: false });

  useEffect(() => {
    if (isEmpty(codeDelivery)) {
      window.location.replace('');
    }
  }, []);

  useEffect(() => {
    if (!isEmpty(changePasswordErrorData)) {
      if (changePasswordErrorData.code === 'CodeMismatchException') {
        setError('');
        setErrorObj({ ...errorObj, code: true });
      }
      if (changePasswordErrorData.code === 'InvalidPasswordException') {
        setError('Password should be at least 8 characters with 1 uppercase letter, 1 number and 1 special character.');
      }
    }
  }, [changePasswordErrorData]);

  const onSubmit = e => {
    e.preventDefault();
    const hasCode = !isEmpty(credentials.code);
    const hasPw = !isEmpty(credentials.password);
    const hasConfirmPw = !isEmpty(credentials.confirmPassword);
    if (!hasCode || !hasPw || !hasConfirmPw) {
      setError('');
      setErrorObj({
        ...errorObj,
        code: !hasCode,
        password: !hasPw,
        confirmPassword: !hasConfirmPw
      });
    } else if ((hasPw && hasConfirmPw) && (credentials.password !== credentials.confirmPassword)) {
      setError('The password you provided doesn’t match.');
    } else {
      actionForgotPasswordSubmit(codeDelivery.username, credentials.password, credentials.code);
    }
  };

  return (
    <>
      <SvgIconWrapper>
        <SvgIcon symbol={ImgSamsung} height={40} width={446} />
      </SvgIconWrapper>
      <CardContainer>
        <Card>
          <Card.Row marginBottom={error ? 16 : 48}>
            <Text fontSize={16}>A verification code has been sent to your email. Please create a password and enter the code below</Text>
          </Card.Row>
          <ErrorText>{error || ''}</ErrorText>
          <form onSubmit={e => onSubmit(e)}>
            <Card.Row marginBottom={20}>
              <InputWithLabel
                type="password"
                id="newPassword"
                placeholder={`New password ${errorObj.password ? 'required' : ''}  *`}
                autoFocus
                onChange={text => {
                  setCredentials({
                    ...credentials,
                    password: text
                  });
                }}
                minWidth={500}
                hasError={error || errorObj.password}
              />
            </Card.Row>
            <Card.Row marginBottom={20}>
              <InputWithLabel
                type="password"
                id="confirmPassword"
                placeholder={`Confirm password ${errorObj.confirmPassword ? 'required' : ''} *`}
                onChange={text => {
                  setCredentials({
                    ...credentials,
                    confirmPassword: text
                  });
                }}
                minWidth={500}
                hasError={error || errorObj.confirmPassword}
              />
            </Card.Row>
            <Card.Row marginBottom={30}>
              <InputWithLabel
                id="verificationCode"
                placeholder={errorObj.code ? 'Invalid verification code *' : 'Verification code *'}
                onChange={text => {
                  setCredentials({
                    ...credentials,
                    code: text
                  });
                }}
                minWidth={500}
                hasError={errorObj.code}
              />
            </Card.Row>
            <ButtonContainer>
              <FillButton type="submit">Submit</FillButton>
            </ButtonContainer>
          </form>
        </Card>
      </CardContainer>
    </>
  );
};

export default connect(state => ({
  codeDelivery: state.common.auth.codeDelivery,
  changePasswordErrorData: state.common.auth.changePasswordErrorData
}), {
  actionForgotPasswordSubmit
})(ResetPassword);
