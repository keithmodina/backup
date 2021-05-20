import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import Text from '../components/Text';
import SvgIcon from '../components/SvgIcon';

import { actionNavigateTo } from '../../reduxModules/common/routes';

import {
  ROUTE_PRIVACY_POLICY_LIST,
  ROUTE_SERVICES,
  ROUTE_SETTINGS,
  ROUTE_TRANSLATIONS,
  ROUTE_LOCATION_LANGUAGE
} from '../../constants/routes';

import IcPrivacyPolicy from '../../assets/icons/common/ic_privacy_policy.svg';
import IcServices from '../../assets/icons/common/ic_services.svg';
import IcTranslations from '../../assets/icons/common/ic_translations.svg';
import IcSettings from '../../assets/icons/common/ic_settings.svg';
import IcLocationLanguage from '../../assets/icons/common/ic_location_language.svg';
import Spacer from '../components/Spacer';

const propTypes = {
  activeTab: PropTypes.number
};

const defaultProps = {
  activeTab: 0
};

const buttons = [{
  name: 'Privacy Policy',
  location: ROUTE_PRIVACY_POLICY_LIST,
  icon: IcPrivacyPolicy
},
{
  name: 'Location / Language',
  location: ROUTE_LOCATION_LANGUAGE,
  icon: IcLocationLanguage
},
{
  name: 'Services',
  location: ROUTE_SERVICES,
  icon: IcServices
}, {
  name: 'Translations',
  location: ROUTE_TRANSLATIONS,
  icon: IcTranslations
}, {
  name: 'Settings',
  location: ROUTE_SETTINGS,
  icon: IcSettings
}];

const SideBarContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  background: theme.sidebarBgColor,
  paddingTop: 40
}));

const SidebarLinkContainer = styled('div')(({ theme, isActive }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  minWidth: 280,
  minHeight: 56,
  cursor: 'pointer',
  background: isActive ? theme.sidebarBtnActiveBg : theme.sidebarBgColor,
  paddingLeft: 41,
  borderBottom: `1px solid ${theme.sidebarBtnBorderBottomColor}`
}));

const SidebarLink = styled('a')(({ isActive, theme }) => ({
  justifyContent: 'flex-start',
  border: 0
}));

const StyledText = styled(Text)(({ isActive, theme }) => ({
  fontSize: 16,
  lineHeight: isActive ? '24px' : '21px',
  color: theme.sidebarTextColor,
  fontWeight: isActive ? 700 : 500,
  ':hover': {
    cursor: 'pointer'
  }
}));

const SideBar = ({
  actionNavigateTo,
  activeTab
}) => {
  const handleButtonClick = location => {
    actionNavigateTo(location);
  };

  return (
    <Fragment>
      <SideBarContainer>
        {
          buttons.map((button, index) => {
            const isActive = index === activeTab;
            return (
              <SidebarLinkContainer
                isActive={isActive}
                key={button.location}
                onClick={() => handleButtonClick(button.location)}
              >
                <SvgIcon symbol={button.icon} size={24} />
                <Spacer spacing={11} />
                <SidebarLink>
                  <StyledText isActive={isActive}>{button.name}</StyledText>
                </SidebarLink>
              </SidebarLinkContainer>
            );
          })
        }
      </SideBarContainer>
    </Fragment>
  );
};

SideBar.propTypes = propTypes;
SideBar.defaultProps = defaultProps;

export default connect((state, props) => ({
  activeTab: state.common.sidebar.activeTab, props
}), {
  actionNavigateTo
})(SideBar);
