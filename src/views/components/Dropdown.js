import React, { useState } from 'react';
import styled from '@emotion/styled';

import SvgIcon from './SvgIcon';
import FillButton from './FillButton';
import FlatButton from './FlatButton';

import IcDropdown from '../../assets/icons/common/ic_dropdown.svg';
import { DROPDOWN_OPTIONS } from '../../constants/zIndex';

const Container = styled('div')({
  margin: 0,
  overflow: 'none'
});

const DropdownButton = styled(FillButton)(({ theme, width }) => ({
  width,
  minWidth: 'auto',
  marginLeft: 20,
  border: `1px solid ${theme.fillBtnBgColor}`,
  '&:hover > svg': {
    color: theme.white,
    fill: theme.white
  }
}));

const DropdownIcon = styled(SvgIcon)(({ theme, isOpen }) => ({
  marginLeft: 10,
  color: isOpen ? theme.white : theme.primaryColor,
  fill: isOpen ? theme.white : theme.primaryColor
}));

const DropdownOptions = styled('div')(({ theme, show }) => ({
  display: show ? 'relative' : 'none',
  position: 'absolute',
  right: 40,
  border: `1px solid ${theme.fillBtnBgColor}`,
  background: theme.white,
  borderRadius: 26,
  marginTop: 10,
  padding: 15,
  zIndex: DROPDOWN_OPTIONS
}));

const Option = styled(FlatButton)(({ theme, isDelete }) => ({
  width: '100%',
  fontWeight: 'bold',
  lineHeight: '24px',
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
  borderBottom: `1px solid ${theme.detailsDividerColor}`,
  padding: '8px 0',
  color: isDelete && theme.errorTextColor,
  '&:first-of-type': {
    paddingTop: 0
  },
  '&:last-of-type': {
    borderBottom: 0,
    paddingBottom: 0
  },
  '&:disabled': {
    opacity: 0.5
  }
}));

const Dropdown = ({
  width = 104,
  title,
  options,
  isEditDisabled,
  isDeleteDisabled,
  handleOnClickOption
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const isDisabled = index => {
    switch (index) {
      case 1: return isEditDisabled;
      case 2: return isDeleteDisabled;
      default: return false;
    }
  };

  return (
    <Container>
      <DropdownButton
        inverted={!isOpen}
        width={width}
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <DropdownIcon
          symbol={IcDropdown}
          isOpen={isOpen}
          width={10}
          height={6}
        />
      </DropdownButton>
      <DropdownOptions show={isOpen}>
        {
          options.map(option => {
            return (
              <Option
                tabIndex={option.index}
                key={option.index}
                color={option.color}
                isDelete={option.isDelete}
                onBlur={() => setIsOpen(!isOpen)}
                onClick={() => handleOnClickOption(option.index)}
                disabled={isDisabled(option.index)}
              >
                {option.optionName}
              </Option>
            );
          })
        }
      </DropdownOptions>
    </Container>
  );
};

export default Dropdown;
