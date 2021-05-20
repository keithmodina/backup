import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import Text from './Text';
import Spacer from './Spacer';
// import ErrorBubble from './ErrorBubble';
import SVGPath from '../../assets/icons/common/check.png';

const propTypes = {
  role: PropTypes.string,
  tabIndex: PropTypes.number,
  size: PropTypes.number,
  position: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  isForm: PropTypes.bool,
  readOnly: PropTypes.bool
};

const defaultProps = {
  role: 'menuitemcheckbox',
  tabIndex: 0,
  size: 20,
  position: 'absolute',
  checked: false,
  disabled: false,
  isForm: false,
  readOnly: false
};

const defaultCheckboxStyle = {
  width: 15,
  height: 10,
  top: 4,
  left: 2
};

const CheckboxContainer = styled('input')(({
  theme, size, customStyle
}) => ({
  WebkitAppearance: 'none',
  backgroundColor: theme.white,
  border: `1px solid ${theme.checkboxBorderColor}`,
  position: 'relative',
  height: size,
  width: size,
  cursor: 'pointer',
  margin: '0 3px',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: theme.checkboxHoverColor
  },
  '&:checked': {
    backgroundColor: theme.checkboxCheckedBgColor,
    border: `1px solid ${theme.checkboxCheckedBgColor}`,
    '&::after': {
      content: '""',
      backgroundImage: `url('${SVGPath}')`,
      backgroundSize: '100% 100%',
      position: 'absolute',
      ...customStyle,
      width: size - 5,
      height: size - 10
    }
  }
}));

const GroupContainerCheckbox = styled('div')({
  display: 'flex',
  position: 'relative',
  marginBottom: 10
});

const GroupCheckboxLabel = styled(Text)(({ theme, width, clickable }) => ({
  color: theme.checkboxTextColor,
  display: 'flex',
  height: '100%',
  width,
  cursor: clickable ? 'pointer' : 'unset'
}));

const RequiredAsterisk = styled(Text)(({ theme }) => ({
  color: theme.requiredAsteriskColor
}));

const GroupContainer = ({ children, isError, errorMsg }) => (
  <GroupContainerCheckbox>
    {children}
    {/* {isError && errorMsg && <ErrorBubble message={errorMsg} />} */}
  </GroupContainerCheckbox>
);

const GroupLabel = ({
  children, width, isRequired, clickable, ...others
}) => (
    <GroupCheckboxLabel width={width} clickable={clickable} {...others}>
      <Spacer spacing={10} />
      {children}
      {
        isRequired
        && (
          <>
            <Spacer spacing={5} />
            <RequiredAsterisk>*</RequiredAsterisk>
          </>
        )
      }
    </GroupCheckboxLabel>
);

const Checkbox = ({
  role, tabIndex, size, position, checked, disabled, isForm, readOnly, ...others
}) => (
    <CheckboxContainer
      type="checkbox"
      checked={checked}
      role={role}
      tabIndex={tabIndex}
      position={position}
      disabled={disabled}
      size={size > 20 ? size : 20}
      customStyle={defaultCheckboxStyle}
      readOnly
      {...others}
    />
);

Checkbox.GroupContainer = GroupContainer;
Checkbox.GroupLabel = GroupLabel;
Checkbox.propTypes = propTypes;
Checkbox.defaultProps = defaultProps;

export default Checkbox;
