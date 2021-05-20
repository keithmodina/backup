import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import button from '../../styles/common/button';

const propTypes = {
  tabIndex: PropTypes.PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

const defaultProps = {
  tabIndex: 0
};

const SvgButtonComponent = styled('div')(
  ({ theme, disabled }) => ({
    backgroundColor: theme.iconBtnBgColor,
    fill: disabled ? `${theme.iconBtnDisabledIconColor} !important` : theme.iconBtnIconColor,
    color: disabled ? `${theme.iconBtnDisabledIconColor} !important` : theme.iconBtnIconColor,
    border: 0,
    pointerEvents: disabled ? 'none' : 'auto',

    '&:active': {
      fill: theme.iconBtnIconColor,
      color: theme.iconBtnIconColor
    }
  }),
  button
);

const SvgButton = ({ tabIndex, ...others }) => (
  <SvgButtonComponent tabIndex={tabIndex} {...others} />
);

SvgButton.propTypes = propTypes;
SvgButton.defaultProps = defaultProps;

export default SvgButton;
