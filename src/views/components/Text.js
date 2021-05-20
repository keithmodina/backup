import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const propTypes = {
  bold: PropTypes.bool,
  clickable: PropTypes.bool,
  fontSize: PropTypes.number,
  noWrap: PropTypes.bool
};

const defaultProps = {
  bold: false,
  clickable: false,
  fontSize: 14,
  noWrap: false
};

const Text = styled('span')(({
  theme, clickable, bold, fontSize, noWrap, lineHeight, italic, align, margin
}) => ({
  color: clickable ? theme.clickableTextColor : theme.textColor,
  fontWeight: bold ? '700' : '500',
  fontStyle: italic ? 'italic' : 'normal',
  fontSize,
  lineHeight: lineHeight ? `${lineHeight}px` : '',
  whiteSpace: noWrap ? 'nowrap' : 'normal',
  textAlign: align || 'inherit',
  margin,

  ':hover': {
    cursor: clickable ? 'pointer' : 'default',
    backgroundColor: clickable ? theme.headerDrawerHoverBgColor : 'transparent',
    color: clickable ? theme.clickableTextHoverColor : ''
  },
  ':active': {
    cursor: clickable ? 'pointer' : 'default',
    backgroundColor: clickable ? theme.headerDrawerActiveBgColor : 'transparent',
    color: clickable ? theme.clickableTextActiveColor : ''
  }
}));

Text.propTypes = propTypes;
Text.defaultProps = defaultProps;

export default Text;
