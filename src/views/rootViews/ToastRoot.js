import React from 'react';
import styled from '@emotion/styled';
import { connect } from 'react-redux';

import isEmpty from '../../utils/isEmpty';
import { TOAST } from '../../constants/zIndex';

import Toast from '../components/Toast';
import Spacer from '../components/Spacer';
import Text from '../components/Text';

const Container = styled('div')({
  position: 'fixed',
  zIndex: TOAST,
  display: 'flex',
  width: '100vw'
}, {
  bottom: 34,
  justifyContent: 'center',
  alignItems: 'center'
});

const ToastContainer = styled(Toast)({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'row'
});

const Message = styled(Text)({
  fontSize: 14,
  color: 'inherit',
  lineHeight: '18px',
  textAlign: 'left',
  '[dir="rtl"] &': {
    textAlign: 'right'
  }
});

const ToastLink = styled(Text)(({ theme }) => ({
  fontSize: 14,
  color: theme.toastButtonColor,
  cursor: 'pointer !important',
  textAlign: 'unset',
  width: 'auto',
  marginTop: 0,

  ':hover': {
    color: theme.toastButtonHoverColor
  },
  ':active': {
    color: theme.toastButtonActiveColor
  },
  '[dir="rtl"] &': {
    textAlign: 'unset'
  }

}));

const ToastRoot = ({ isShown, props, ...other }) => {
  const { message, buttonText, onClick } = props;

  return (
    <Container id="toast-root" data-testid="toastRoot">
      {
        isEmpty(buttonText)
          ? isShown && <Toast {...other}>{message}</Toast>
          : isShown && (
            <ToastContainer>
              <Message>{message}</Message>
              <Spacer spacing={32} />
              <ToastLink data-testid="toastLink" bold onClick={onClick} tabIndex={0}>{buttonText}</ToastLink>
            </ToastContainer>
          )
      }

    </Container>
  );
};
export default connect(state => ({
  isShown: state.common.toast.isShown,
  props: state.common.toast.props
}))(ToastRoot);
