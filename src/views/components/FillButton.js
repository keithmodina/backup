import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import button from '../../styles/common/button';

const propTypes = {
  inverted: PropTypes.bool,
  fontSize: PropTypes.number,
  bold: PropTypes.bool
};

const defaultProps = {
  inverted: false,
  fontSize: 16,
  bold: true
};

const FillButton = styled('button')(
  {
    display: 'flex'
  },
  ({
    theme, inverted, fontSize, bold, minWidth = 150
  }) => ({
    minWidth,
    width: 'auto',
    height: 40,
    borderRadius: '26px',
    backgroundColor: inverted ? theme.fillBtnBgInvertedColor : theme.fillBtnBgColor,
    color: inverted ? theme.fillBtnInvertedTextColor : theme.fillBtnTextColor,
    fill: inverted ? theme.fillBtnInvertedTextColor : theme.fillBtnTextColor,
    border: '0px none',
    fontSize,
    fontWeight: bold ? 700 : 400,
    '&:hover': {
      backgroundColor: inverted ? theme.fillBtnBgColor : theme.fillBtnHoverBgColor,
      color: inverted && theme.white
    },

    '&:active': {
      backgroundColor: theme.fillBtnActiveBgColor
    },

    '&:disabled': {
      backgroundColor: theme.fillBtnDisabledBgColor,
      pointerEvents: 'none'
    },
    display: 'static'
  }),
  button
);

FillButton.propTypes = propTypes;
FillButton.defaultProps = defaultProps;

export default FillButton;
