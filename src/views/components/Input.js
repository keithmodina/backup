import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import SvgIcon from './SvgIcon';

const propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  height: PropTypes.number
};

const defaultProps = {
  type: 'text',
  placeholder: '',
  width: '100%',
  height: 60
};

const InputFieldContainer = styled('div')(({ width, height }) => ({
  height,
  width,
  display: 'flex',
  flexDirection: 'row-reverse',
  position: 'relative'
}));

const IconContainer = styled('div')({
  paddingRight: 20,
  borderRadius: '4px 0 0 4px',
  borderBottom: 0,
  height: '100%',
  position: 'absolute',
  flexShrink: 0,
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  right: 0,
  '> svg': {
    cursor: 'pointer'
  }
});

const InputComponent = styled('input')(({ theme }) => ({
  fontSize: 14,
  fontWeight: 500,
  width: '100%',
  border: `1px solid ${theme.inputBorderColor}`,
  borderRadius: 26,
  padding: '0px 20px',
  backgroundColor: `${theme.white}`,
  color: theme.inputTextColor,

  '&:focus': {
    outline: 'none'
  },

  '::placeholder': {
    color: theme.inputPlaceHolderColor
  }

}));

const Input = ({
  type,
  placeholder,
  width,
  hasIcon,
  height,
  icon,
  value,
  handleIconClick,
  ...others
}) => {
  return (
    <InputFieldContainer height={height} width={width}>
      {
        hasIcon
          ? (
            <IconContainer>
              <SvgIcon
                symbol={icon}
                size={18}
                onClick={handleIconClick}
              />
            </IconContainer>
          ) : null
      }
      <InputComponent value={value} type={type} placeholder={placeholder} {...others} />
    </InputFieldContainer>
  );
};

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
