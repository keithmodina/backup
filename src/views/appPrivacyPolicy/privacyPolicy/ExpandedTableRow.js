import React, { useState, useEffect, Fragment } from 'react';
import styled from '@emotion/styled';

const RowContainer = styled('tr')(({ theme, isClickable }) => ({
  borderTop: `1px solid ${theme.tableBorderColor}`,
  padding: '16px 0',
  cursor: isClickable ? 'pointer' : ''
}));

const CellContainer = styled('td')(({
  theme,
  paddingLeft,
  minWidth,
  isEmpty
}) => ({
  padding: !isEmpty ? '18px 40px 18px 0' : 0,
  fontSize: 16,
  lineHeight: '21px',
  paddingLeft,
  minWidth,
  textAlign: 'left',
  '&:last-of-type': {
    paddingRight: 36
  }
}));

const ExpandedTableRow = ({
  values
}) => {
  const [allRows, setAllRows] = useState([]);

  useEffect(() => {
    if (values.length) {
      const newArr = values.map(item => {
        const perItemRows = getItemsToRender(item);
        return perItemRows;
      });

      setAllRows(newArr);
    }
  }, [values]);

  const getItemsToRender = item => {
    const itemRows = [
      <RowContainer key={'row-' + item._id}>
        <CellContainer paddingLeft={35}>{item._id}</CellContainer>
        <CellContainer>{item.name}</CellContainer>
      </RowContainer>
    ];

    const subRows = item.options
      ? item.options.map(subOptions => {
        return (
          <RowContainer key={'row-sub-' + subOptions._id}>
            <CellContainer paddingLeft={85}>{subOptions._id}</CellContainer>
            <CellContainer>{subOptions.name}</CellContainer>
          </RowContainer>
        );
      }) : [];

    itemRows.push(subRows);
    return itemRows;
  };

  return (
    <Fragment>{allRows}</Fragment>
  );
};

export default ExpandedTableRow;
