import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import Text from './Text';
import Check from '../../assets/icons/common/Check.png';

const propTypes = {
  containerStyle: PropTypes.objectOf(PropTypes.shape()),
  checkDimensions: PropTypes.objectOf(PropTypes.shape()),
  spanDimensions: PropTypes.objectOf(PropTypes.shape()),
  checked: PropTypes.boolean,
  fieldName: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};

const defaultProps = {
  containerStyle: {},
  checkDimensions: {
    height: '100%',
    width: '100%'
    // marginLeft: '15%',
    // marginTop: '15%'
  },
  spanDimensions: { height: 20, width: 20, marginRight: 10 },
  checked: false,
  disabled: false,
  onClick: () => { }
};

const GroupLabel = styled(Text)({
  marginBottom: 20,
  marginRight: 0,
  display: 'flex',
  fontWeight: 700
});

const GroupContainer = styled('div')({
  display: 'block',
  alignItems: 'center',
  width: '100%',
  position: 'relative',
  height: 'auto'
});

const RadioContainer = styled('div')({
  display: 'flex'
});

const Container = styled('div')(({ containerStyle }) => ({
  display: 'flex',
  ...containerStyle
}));

const Label = styled('div')(({ dimensions }) => ({
  position: 'relative',
  ...dimensions
}));

const Checkbox = styled('input')(({
  theme, checkDimensions, spanDimensions
}) => ({
  position: 'absolute',
  opacity: 0,
  cursor: 'pointer',
  '&:checked + span': {
    border: `1px solid ${theme.inputLabelTextColorActive}`,
    // backgroundColor: '#ffffff',
    position: 'absolute',
    cursor: 'pointer',
    checkColor: theme.primaryColor,
    backgroundImage: `url(${Check})`,
    top: 0,
    ...spanDimensions,
    '&::after': {
      content: '""',
      borderRadius: 'inherit',
      display: 'block',
      ...checkDimensions
    },
    '&:disabled': {
      backgroundColor: '#ffffff',
      border: 0,
      position: 'absolute',
      checkColor: theme.primaryColor,
      height: 50,
      width: 50,
      padding: 5,
      top: 0,
      ...spanDimensions,
      '&::after': {
        content: '""',
        borderRadius: 'inherit',
        display: 'block',
        backgroundColor: '#252525',
        ...checkDimensions
      }
    }
  },
  '~ span': {
    border: '1px solid rgba(0,0,0, .54)',
    position: 'absolute',
    borderRadius: '50%',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
    top: 0,
    ...spanDimensions,
    '&:disabled': {
      position: 'absolute',
      borderRadius: '50%',
      top: 0,
      ...spanDimensions
    }
  }
}));

const Checkmark = styled('span')(({}));

const TextLabel = styled(Text)(({ theme, checked }) => ({
  display: 'block',
  fontWeight: 500,
  fontSize: 16,
  lineHeight: '21px',
  cursor: 'pointer !important',
  color: checked ? '' : `${theme.radioButtonUnselectedText} !important`
}));

const RadioButton = ({
  containerStyle,
  checkDimensions,
  spanDimensions,
  fieldName,
  textLabel,
  checked,
  onClick,
  disabled
}) => {
  const onSpanClick = e => {
    if (!disabled) {
      const radioButton = e.target.previousSibling;
      radioButton.click();
      onClick();
    }
  };

  return (
    <Container containerStyle={containerStyle}>
      <Label dimensions={spanDimensions}>
        <Checkbox
          name={fieldName}
          checkDimensions={checkDimensions}
          spanDimensions={spanDimensions}
          type="radio"
          checked={checked}
          readOnly
        />
        <Checkmark onClick={onSpanClick} role="radio" tabIndex="0" />
      </Label>
      <TextLabel checked={checked} onClick={onSpanClick}>{textLabel}</TextLabel>
    </Container>
  );
};

RadioButton.Label = GroupLabel;
RadioButton.GroupContainer = GroupContainer;
RadioButton.RadioContainer = RadioContainer;
RadioButton.propTypes = propTypes;
RadioButton.defaultProps = defaultProps;

export default RadioButton;
