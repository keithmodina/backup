import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const propTypes = {
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

const defaultProps = {
  height: 'auto'
};

const CenterContainer = styled('div')(({
  height
}) => ({
  width: '100%',
  height,
  justifyContent: 'center',
  display: 'flex',
  alignItems: 'center'
}));

const LoadingIcon = styled('div')(({ theme }) => ({
  background: `url(${theme.loadingIcon})`,
  width: 42,
  height: 42,
  borderRadius: 42,
  backgroundSize: 42,
  display: 'block',
  margin: 'auto'
}));

const Loader = ({
  height
}) => (
  <CenterContainer
    height={height}
  >
    <LoadingIcon />
  </CenterContainer>
);

Loader.propTypes = propTypes;
Loader.defaultProps = defaultProps;

export default Loader;
