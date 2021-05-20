import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

import Card from '../components/Card';
import FillButton from '../components/FillButton';
import InputWithLabel from '../components/InputWithLabel';
import SvgIcon from '../components/SvgIcon';

import ImgSamsung from '../../assets/icons/common/samsung_admin.svg';

import { actionCompleteNewPassword } from '../../reduxModules/common/auth';
import isEmpty from '../../utils/isEmpty';

import { CardContainer } from '../appLogin';

import { hasNumber } from '../../utils/stringManip';

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

const initialErrorState = {
  givenName: false,
  familyName: false,
  password: false,
  confirmPassword: false
};

const CreatePassword = ({
  actionCompleteNewPassword,
  firstTimeLoginData,
  firstTimeLoginErrorData
}) => {
  const [credentials, setCredentials] = useState({
    givenName: '',
    familyName: '',
    password: null,
    confirmPassword: null
  });
  const [error, setError] = useState('');
  const [errorObj, setErrorObj] = useState(initialErrorState);

  useEffect(() => {
    if (isEmpty(firstTimeLoginData)) {
      window.location.replace('');
    }
  }, []);

  useEffect(() => {
    if (!isEmpty(firstTimeLoginErrorData)) {
      if (firstTimeLoginErrorData.code === 'InvalidPasswordException') {
        setError('Password should be at least 8 characters with 1 uppercase letter, 1 number and 1 special character.');
      }
    }
  }, [firstTimeLoginErrorData]);

  const onSubmit = e => {
    e.preventDefault();
    const hasGivenName = !isEmpty(credentials.givenName);
    const hasFamName = !isEmpty(credentials.familyName);
    const hasPw = !isEmpty(credentials.password);
    const hasConfirmPw = !isEmpty(credentials.confirmPassword);

    if (!hasGivenName || !hasFamName || !hasPw || !hasConfirmPw) {
      setError('');
      setErrorObj({
        ...errorObj,
        givenName: !hasGivenName,
        familyName: !hasFamName,
        password: !hasPw,
        confirmPassword: !hasConfirmPw
      });
    } else if ((hasGivenName && hasNumber(credentials.givenName))
      || (hasFamName && hasNumber(credentials.familyName))) {
      setError('Please use letters only.');
      setErrorObj({
        ...errorObj,
        givenName: true,
        familyName: true,
        password: false,
        confirmPassword: false
      });
    } else if ((hasPw && hasConfirmPw) && (credentials.password !== credentials.confirmPassword)) {
      setError('The password you provided doesn’t match.');
      setErrorObj({
        ...errorObj,
        password: true,
        confirmPassword: true,
        givenName: false,
        familyName: false
      });
    } else {
      setError('');
      setErrorObj(initialErrorState); // TODO:
      actionCompleteNewPassword({ credentials });
    }
  };

  return (
    <>
      <SvgIconWrapper>
        <SvgIcon symbol={ImgSamsung} height={40} width={446} />
      </SvgIconWrapper>
      <CardContainer>
        <Card>
          <Card.Title marginBottom={error ? 16 : 48}>Personal Information</Card.Title>
          <ErrorText>{error || ''}</ErrorText>
          <form onSubmit={e => onSubmit(e)}>
            <Card.Row marginBottom={20}>
              <InputWithLabel
                id="givenName"
                placeholder={`Given name ${(errorObj.givenName && !error) ? 'required' : ''} *`}
                autoFocus
                onChange={text => {
                  setCredentials({
                    ...credentials,
                    givenName: text
                  });
                }}
                minWidth={500}
                hasError={errorObj.givenName}
              />
            </Card.Row>
            <Card.Row marginBottom={20}>
              <InputWithLabel
                id="familyName"
                placeholder={`Family name ${(errorObj.familyName && !error) ? 'required' : ''} *`}
                onChange={text => {
                  setCredentials({
                    ...credentials,
                    familyName: text
                  });
                }}
                minWidth={500}
                hasError={errorObj.familyName}
              />
            </Card.Row>
            <Card.Row marginBottom={20}>
              <InputWithLabel
                type="password"
                id="password"
                placeholder={`New password ${(errorObj.password && !error) ? 'required' : ''} *`}
                onChange={text => {
                  setCredentials({
                    ...credentials,
                    password: text
                  });
                }}
                minWidth={500}
                hasError={errorObj.password}
              />
            </Card.Row>
            <Card.Row marginBottom={20}>
              <InputWithLabel
                type="password"
                id="confirmPassword"
                placeholder={`Confirm password ${(errorObj.confirmPassword && !error) ? 'required' : ''} *`}
                onChange={text => {
                  setCredentials({
                    ...credentials,
                    confirmPassword: text
                  });
                }}
                minWidth={500}
                hasError={errorObj.confirmPassword}
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
  firstTimeLoginData: state.common.auth.firstTimeLoginData,
  firstTimeLoginErrorData: state.common.auth.firstTimeLoginErrorData
}), {
  actionCompleteNewPassword
})(CreatePassword);
