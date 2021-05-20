import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';

import FillButton from '../components/FillButton';
import Text from '../components/Text';
import Spacer from '../components/Spacer';
import { actionLogout } from '../../reduxModules/common/auth';
import SvgIcon from '../components/SvgIcon';
import { USER_DROP_DOWN } from '../../constants/zIndex';

import imgUserDefault from '../../assets/icons/common/img_user_icon_default.svg';

const animateTransform = keyframes`
  0% { transform: scale(0.8);}
  50% { transform: scale(1);}
  80% { transform: scale(1.05);}
  100% { transform: scale(1);}
`;

const Container = styled('div')(({
  theme, isOpen
}) => ({
  display: isOpen ? 'flex' : 'none',
  background: theme.white,
  borderRadius: 26,
  border: `1px solid ${theme.modalBorderColor}`,
  position: 'absolute',
  right: 5,
  zIndex: USER_DROP_DOWN,
  padding: '36px 38px 30px',
  marginRight: 40,
  flexDirection: 'column',
  opacity: isOpen ? 1 : 0,
  top: 90,
  bottom: 'auto',
  animation: isOpen ? `${animateTransform} 0.3s` : '',
  transform: isOpen ? 'scale(1)' : '',
  transformOrigin: 'top right',
  transition: 'opacity 0.2s linear, visibility 0.3s linear, transform 0.3s linear',
  minHeight: 179,
  minWidth: 344
}));

const ProfileContainer = styled('div')(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  marginBottom: 27,
  '&:hover > div > button': {
    backgroundColor: theme.userDrawerHoverLinkBg,
    color: theme.userDrawerHoverLink
  },
  '&:active > div > button': {
    backgroundColor: theme.userDrawerActiveLinkBg,
    color: theme.userDrawerActiveLink
  },
  '&:hover > div > div > button': {
    backgroundColor: theme.userDrawerHoverLinkBg,
    color: theme.userDrawerHoverLink
  },
  '&:active > div > div > button': {
    backgroundColor: theme.userDrawerActiveLinkBg,
    color: theme.userDrawerActiveLink
  },
  '&:hover > div > span': {
    backgroundColor: theme.userDrawerHoverLinkBg,
    color: theme.userDrawerHoverLink
  },
  '&:active > div > span': {
    backgroundColor: theme.userDrawerActiveLinkBg,
    color: theme.userDrawerActiveLink
  },
  '&:hover > * svg': {
    fill: theme.userThumbHoverColor,
    color: theme.userThumbHoverColor
  },
  '&:active > * svg': {
    fill: theme.userThumbActiveColor,
    color: theme.userThumbActiveColor
  }
}));

const Avatar = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  width: 40,
  height: 40,
  cursor: 'pointer',
  justifyContent: 'center'
}));

const ProfileName = styled(Text)(({ theme }) => ({
  cursor: 'pointer',
  lineHeight: '23px',
  marginBottom: 0,
  fontSize: 19
}));

const AccountID = styled(Text)(({ theme }) => ({
  color: theme.secondaryTextColor,
  cursor: 'pointer',
  lineHeight: '17px',
  fontSize: 14
}));

const SignOutButton = styled(FillButton)(() => ({
  margin: '0 auto',
  height: 40,
  minWidth: 242
}));

const ProfileInfo = styled('div')(() => ({
  textAlign: 'left',
  cursor: 'pointer',
  height: 46,
  '& span': {
    display: 'block'
  }
}));

const UserDrawer = ({
  actionLogout,
  isDrawerVisible,
  email,
  name
}) => {
  return (
    <Fragment>
      <Container isOpen={isDrawerVisible} id="user-drawer">
        <ProfileContainer tabIndex={0}>
          <Avatar>
            <SvgIcon symbol={imgUserDefault} size={40} />
          </Avatar>
          <Spacer spacing={16} />
          <ProfileInfo>
            <ProfileName>{name}</ProfileName>
            <AccountID>{email}</AccountID>
          </ProfileInfo>
        </ProfileContainer>
        <SignOutButton onClick={actionLogout}>Sign Out</SignOutButton>
      </Container>
    </Fragment>
  );
};

export default connect(state => ({
  isDrawerVisible: state.common.user.isDrawerVisible
}), {
  actionLogout
})(UserDrawer);
