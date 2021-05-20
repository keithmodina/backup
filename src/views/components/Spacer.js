import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const propTypes = {
  spacing: PropTypes.number.isRequired,
  spacingMedium: PropTypes.number,
  spacingSmall: PropTypes.number
};

const defaultProps = {
  spacingMedium: null,
  spacingSmall: null
};

const Spacer = styled('div')(
  {
    pointerEvents: 'none'
  },
  ({
    spacing, spacingMedium, spacingSmall
  }) => ({
    width: spacing,
    flexShrink: 0
  })
);

Spacer.propTypes = propTypes;
Spacer.defaultProps = defaultProps;

export default Spacer;
