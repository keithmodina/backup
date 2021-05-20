import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const propTypes = {
  zIndex: PropTypes.number
};

const defaultProps = {
  zIndex: 0
};

const ViewPortLayer = styled('div')(({ theme, zIndex }) => ({
  zIndex,
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  backgroundColor: theme.bodyBgColor
}));

ViewPortLayer.propTypes = propTypes;
ViewPortLayer.defaultProps = defaultProps;

export default ViewPortLayer;
