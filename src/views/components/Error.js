import React from 'react';
import { connect } from 'react-redux';

import styled from '@emotion/styled';
import Text from './Text';
import Title from '../layouts/Title';
import SvgIcon from './SvgIcon';
import FillButton from './FillButton';

import {
  ROUTE_HOME
} from '../../constants/routes';
import { actionNavigateTo } from '../../reduxModules/common/routes';

const ErrorPageContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.bodyBgColor,
  width: '100%',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 'auto'
}));

const ErrorIcon = styled(SvgIcon)(({ iconheight, iconwidth }) => ({
  height: iconheight || 140,
  width: iconwidth || 272
}));

const ErrorMessage = styled(Text)(({ theme }) => ({
  color: theme.errorPageTextColor,
  fontSize: 16
}));

const Container = styled('div')({
  margin: 0,
  overflow: 'none'
});

const ButtonContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '60px'
});

const StyledFillButton = styled(FillButton)({
  width: '180px'
});

const ErrorPage = ({
  errorType,
  actionNavigateTo
}) => {
  const handleClick = () => {
    if (errorType.errorButtonTitle === 'Go to home page') {
      actionNavigateTo(ROUTE_HOME);
    } else {
      window.history.back();
    }
  };

  return (
    <Container data-testid="errorPageContainer">
      <ErrorPageContainer>
        <ErrorIcon symbol={errorType.errorIcon} iconheight={errorType.errorIconHeight} iconwidth={errorType.errorIconWidth} />
        <Title content={errorType.errorTitle} fontSize={36} margin="20px 40px" />
        {
          errorType.errorMessage.split('<br>').map((message, i) => {
            return (
              <ErrorMessage key={i} alt={message}>{message}</ErrorMessage>
            );
          })
        }
        <ButtonContainer>
          <StyledFillButton onClick={handleClick}>{errorType.errorButtonTitle}</StyledFillButton>
        </ButtonContainer>
      </ErrorPageContainer>
    </Container>
  );
};

export default connect(state => ({

}), {
  actionNavigateTo
})(ErrorPage);
