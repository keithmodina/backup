import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import button from '../../styles/common/button';

const propTypes = {
  fontSize: PropTypes.number,
  bold: PropTypes.bool,
  textTransform: PropTypes.string
};

const defaultProps = {
  fontSize: 16,
  bold: false,
  textTransform: 'initial'
};

const FlatButton = styled('button')(
  {
    lineHeight: '18px',
    border: 0
  },
  ({
    theme,
    fontSize,
    bold,
    textTransform = 'initial',
    underline,
    fontWeight = 'normal'
  }) => ({
    textTransform,
    fontSize: fontSize || 16,
    backgroundColor: theme.flatBtnBgColor,
    color: theme.flatBtnTextColor,
    fontWeight: bold ? 'bold' : fontWeight,
    textDecoration: underline ? 'underline' : 'none',

    '&:hover': {
      backgroundColor: theme.flatBtnHoverBgColor,
      color: theme.flatBtnHoverTextColor
    },

    '&:active': {
      backgroundColor: theme.flatBtnActiveBgColor,
      color: theme.flatBtnActiveTextColor
    },

    '&:disabled': {
      color: theme.flatBtnDisabledTextColor,
      pointerEvents: 'none'
    }
  }),
  button
);

FlatButton.propTypes = propTypes;
FlatButton.defaultProps = defaultProps;

export default FlatButton;
