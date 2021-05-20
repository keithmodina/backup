import React, { useState, useEffect } from 'react';
import PropTypes, { bool } from 'prop-types';
import styled from '@emotion/styled';

const propTypes = {
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  hasError: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string
};

const defaultProps = {
  autoFocus: false,
  disabled: false,
  hasError: false,
  type: 'text',
  value: ''
};

const FloatContainer = styled('div')(({ theme, width, minWidth = 425 }) => ({
  display: 'flex',
  flexDirection: 'column',
  minWidth,
  maxHeight: 60,
  width,
  position: 'relative',
  '&:focus-within label': {
    transform: 'translate(3px, 8px) scale(0.87)',
    color: theme.inputLabelTextColorActive
  },
  '&:focus-within input': {
    border: `1px solid ${theme.inputBorderColorActive}`
  },
  '& .not_empty': {
    transform: 'translate(3px, 8px) scale(0.87)',
    color: theme.inputLabelTextColorInactive
  },
  '& .label_error': {
    transform: 'translate(3px, 8px) scale(0.87)',
    color: theme.inputLabelTextColorError
  },
  '& .input_error': {
    border: `1px solid ${theme.inputBorderColorError}`
  }
}));

const LabelWrapper = styled('label')(({ theme }) => ({
  fontSize: 16,
  lineHeight: '21px',
  fontWeight: 500,
  padding: '0 20px',
  color: theme.inputLabelTextColor,
  pointerEvents: 'none',
  position: 'absolute',
  transform: 'translate(0, 20px) scale(1)',
  transformOrigin: 'top left',
  transition: 'all 0.2s ease-out'
}));

const InputWrapper = styled('input')(({ theme, disabled }) => ({
  fontSize: 16,
  lineHeight: '21px',
  fontWeight: 500,
  fontStyle: 'normal',
  color: theme.primaryTextColor,
  padding: '10px 20px 0',
  height: 60,
  outline: 0,
  border: `1px solid ${theme.inputBorderColor}`,
  borderRadius: 26,
  background: disabled ? theme.inputBgColorDisabled : theme.inputBgColor
}));

const InputWithFloatingLabel = ({
  autoFocus,
  disabled,
  hasError,
  id,
  width,
  minWidth,
  onChange,
  placeholder,
  type,
  value
}) => {
  const [text, setText] = useState(value);
  const [hasText, setHasText] = useState(false);

  const handleTextChange = param => {
    setText(param);
    onChange(param);

    if (param !== '') {
      setHasText(true);
    } else {
      setHasText(false);
    }
  };

  useEffect(() => {
    setHasText(text !== '');
  }, [text]);

  return (
    <FloatContainer width={width} minWidth={minWidth}>
      <InputWrapper
        type={type}
        id={id}
        autoFocus={autoFocus}
        value={text}
        onChange={e => handleTextChange(e.target.value)}
        isActive={hasText}
        className={hasError ? 'input_error' : ''}
        disabled={disabled}
      />
      <LabelWrapper htmlFor={id} className={hasError ? 'label_error' : hasText ? 'not_empty' : ''}>
        {placeholder}
      </LabelWrapper>
    </FloatContainer>
  );
};

InputWithFloatingLabel.propTypes = propTypes;
InputWithFloatingLabel.defaultProps = defaultProps;

export default InputWithFloatingLabel;
