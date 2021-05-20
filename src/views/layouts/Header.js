import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import SvgIcon from '../components/SvgIcon';
import UserDrawer from './UserDrawer';

import ImgUserDefault from '../../assets/icons/common/img_user_icon.svg';
import ImgSamsung from '../../assets/icons/common/samsung_admin.svg';

import { actionToggleUserDrawer } from '../../reduxModules/common/user';
import { HEADER } from '../../constants/zIndex';

const propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  imageSource: PropTypes.string
};

const defaultProps = {
  imageSource: ''
};

const HeaderContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  backgroundColor: theme.headerBgColor,
  width: '100%',
  alignItems: 'center',
  flexDirection: 'row',
  minHeight: 90,
  padding: '24px 40px 26px',
  boxShadow: '0px 3px 3px rgba(68, 68, 68, 0.2)',
  zIndex: HEADER
}));

const LogoWrapper = styled('div')({
  display: 'flex',
  marginRight: 'auto',
  cursor: 'pointer'
});

const UserIconWrapper = styled('div')({
  display: 'flex',
  cursor: 'pointer'
});

const Header = ({
  actionToggleUserDrawer,
  name,
  email,
  imageSource,
  isDrawerVisible
}) => {
  const toggleModal = () => {
    actionToggleUserDrawer(!isDrawerVisible);
  };

  return (
    <HeaderContainer>
      <LogoWrapper onClick={() => window.location.replace('')}>
        <SvgIcon
          symbol={ImgSamsung}
          height={28}
          width={312}
        />
      </LogoWrapper>
      <UserIconWrapper onClick={toggleModal}>
        <SvgIcon symbol={ImgUserDefault} size={40} />
      </UserIconWrapper>
      <UserDrawer name={name} email={email} />
    </HeaderContainer>
  );
};

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default connect(state => ({
  isDrawerVisible: state.common.user.isDrawerVisible
}), {
  actionToggleUserDrawer
})(Header);
