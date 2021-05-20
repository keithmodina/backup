import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.number,
    PropTypes.string
  ]),
  borderRadius: PropTypes.number,
  padding: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ])),
    PropTypes.number,
    PropTypes.string
  ]),
  noShadow: PropTypes.bool,
  marginBottom: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ])
};

const defaultProps = {
  width: '100%',
  borderRadius: 26,
  padding: '40px 40px 30px',
  noShadow: false,
  marginBottom: 0
};

const CardTitle = styled('div')(({
  theme,
  marginBottom = 30,
  marginTop = 0,
  fontSize = 24
}) => ({
  marginTop,
  marginBottom,
  color: theme.cardTitleTextColor,
  fontWeight: 'bold',
  fontSize,
  lineHeight: 'normal'
}));

const CardRow = styled('div')(({ marginBottom = 30, paddingBottom = 0, justifyContent = 'inherit' }) => ({
  display: 'flex',
  marginBottom,
  paddingBottom,
  justifyContent
}));

const Card = styled('div')(({
  theme, maxWidth, height, borderRadius, noShadow, marginBottom, isFilter, isForm
}) => ({
  position: 'relative',
  backgroundColor: theme.white,
  overflow: isFilter || isForm ? 'visible' : 'hidden',
  maxWidth,
  height: height || 'auto',
  borderRadius: noShadow ? 0 : borderRadius,
  padding: '40px 36px 48px',
  boxSizing: 'border-box',
  border: `1px solid ${theme.cardBorderColor}`,
  margin: '0 auto',
  marginBottom
}));

Card.Row = CardRow;
Card.Title = CardTitle;
Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

export default Card;
