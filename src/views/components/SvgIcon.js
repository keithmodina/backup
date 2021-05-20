import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const propTypes = {
  size: PropTypes.number,
  symbol: PropTypes.oneOfType([
    PropTypes.shape({
      id: PropTypes.string,
      viewBox: PropTypes.string
    }),
    PropTypes.string
  ]).isRequired
};

const defaultProps = {
  size: 24
};

const StyledUse = styled('use')({
  pointerEvents: 'none'
});

const SvgIcon = ({
  size, width, height, symbol, ...other
}) => (
    <svg {...other} width={width || size} height={height || size} viewBox={symbol.viewBox}>
      <StyledUse xlinkHref={`#${symbol.id}`} />
    </svg>
);

SvgIcon.propTypes = propTypes;
SvgIcon.defaultProps = defaultProps;

export default SvgIcon;
