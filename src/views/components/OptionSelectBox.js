import React from 'react';
import styled from '@emotion/styled';
import { SELECT_BOX } from '../../constants/zIndex';

const InputBox = styled('div')(({
  theme,
  marginRight,
  isOpenBox,
  width,
  disabled,
  isFetchingError,
  isEmpty
}) => ({
  width,
  height: 'auto',
  borderRadius: 26,
  border: isFetchingError || isEmpty ? `1px solid ${theme.errorTextColor}` : `1px solid ${theme.cardBorderGppColor}`,
  boxSizing: 'border-box',
  marginBottom: 20,
  marginRight,
  backgroundColor: theme.white,
  borderBottomLeftRadius: isOpenBox ? 0 : 26,
  borderBottomRightRadius: isOpenBox ? 0 : 26,
  position: 'relative',
  pointerEvents: disabled ? 'none' : 'auto',
  opacity: disabled ? 0.5 : 'unset'
}));

const Label = styled('div')(({ theme }) => ({
  fontFamily: 'SamsungOne',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: 14,
  lineHeight: '18px',
  color: theme.footerTextColor
}));

const TableContainer = styled('div')(({ isOpen, theme, width }) => ({
  display: isOpen ? 'block' : 'none',
  width,
  maxHeight: 366,
  overflow: 'auto',
  borderBottomLeftRadius: 26,
  borderBottomRightRadius: 26,
  border: `1px solid ${theme.cardBorderGppColor}`,
  borderTop: 0,
  backgroundColor: theme.white,
  position: 'absolute',
  zIndex: SELECT_BOX,
  '::-webkit-scrollbar': {
    width: 4
  },
  '::-webkit-scrollbar-track': {
    borderRadius: 26,
    marginBottom: 20
  },
  '::-webkit-scrollbar-thumb': {
    background: theme.footerTextColor,
    borderRadius: 26
  },
  '::-webkit-scrollbar-thumb:hover': {
    background: theme.footerTextColor
  }
}));

const SelectTable = styled('table')({
  width: '100%',
  maxHeight: 366,
  overflow: 'auto'
});

const SelectTr = styled('tr')({});

const Tbody = styled('tbody')({});

const SelectTd = styled('td')(({ theme }) => ({
  fontFamily: 'SamsungOne',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: 16,
  lineHeight: '21px',
  height: 60,
  borderTop: `1px solid ${theme.inputBorderColor}`,
  padding: '0 19px',
  ':hover': {
    backgroundColor: theme.inputLabelTextColorActive,
    color: theme.white
  }
}));

const SelectBoxWithLabel = styled('div')(({ theme }) => ({
  fontFamily: 'SamsungOne',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: 14,
  display: 'flex',
  lineHeight: '18px'
}));

const SelectBoxValue = styled('input')({
  fontFamily: 'SamsungOne',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: 16,
  lineHeight: '21px',
  height: 32,
  padding: '0 19px',
  width: '100%',
  alignItems: 'center',
  display: 'flex',
  border: 'none',
  backgroundColor: 'transparent'
});

const Arrow = styled('span')({
  transform: 'rotate(90deg)',
  padding: '8px 32px 0px 13px',
  fontSize: 16,
  lineHeight: '26px'
});

const LabelInsideInput = styled(Label)(({ isFetchingError, theme, isEmpty }) => ({
  margin: '10px 19px 0 19px',
  color: isFetchingError || isEmpty ? theme.errorTextColor : theme.footerTextColor
}));

const SelectBox = ({
  setIsOpenBox,
  isOpenBox,
  HandleSelectBoxClick,
  value,
  inputLabel,
  width = '100%',
  data,
  disabled = false,
  onChange,
  isFetchingError,
  isEmpty
}) => {
  return (
    <InputBox
      marginRight={20}
      onClick={() => setIsOpenBox(!isOpenBox)}
      isOpenBox={isOpenBox}
      width={width}
      disabled={disabled}
      isFetchingError={isFetchingError}
      isEmpty={isEmpty}
    >
      <LabelInsideInput isEmpty={isEmpty} isFetchingError={isFetchingError}>{inputLabel}</LabelInsideInput>
      <SelectBoxWithLabel>
        <SelectBoxValue type='text' isFetchingError={isFetchingError} value={value} onChange={onChange} />
        <Arrow>{'>'}</Arrow>
      </SelectBoxWithLabel>
      <TableContainer isOpen={isOpenBox} width={width}>
        <SelectTable>
          <Tbody>
            {
              data && data.map(data => {
                return (
                  <SelectTr key={data.id}>
                    <SelectTd
                      value={data.id}
                      data-code-name={data.countryName || data.languageName}
                      data-region={data.region || ''}
                      onClick={HandleSelectBoxClick}
                    >
                      {data.languageCode || data.countryCode}
                    </SelectTd>
                  </SelectTr>
                );
              })
            }
          </Tbody>
        </SelectTable>
      </TableContainer>
    </InputBox>
  );
};
export default SelectBox;
