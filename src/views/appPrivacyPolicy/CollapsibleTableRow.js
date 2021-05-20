import React, { useState, useEffect, Fragment } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import IcCreate from '../../assets/icons/common/ic_create.svg';
import IcEdit from '../../assets/icons/common/ic_edit.svg';
import IcAccordionHide from '../../assets/icons/common/ic_accordion_hide.svg';
import IcAccordionShow from '../../assets/icons/common/ic_accordion_show.svg';

import { convertDateTimeToLastUpdateFormat } from '../../utils/dateConverter';

import SvgIcon from '../components/SvgIcon';
import LinkText from '../components/LinkText';

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

const SvgAction = styled(SvgIcon)({
  cursor: 'pointer'
});

const defaultProps = {
  handleLanguageClick: () => { }
};

const propTypes = {
  handleLanguageClick: PropTypes.func
};

const CollapsibleTableRow = ({
  handleExpandRow,
  handleOnClickAction,
  handleLanguageClick,
  hasSearchResult,
  searchKey,
  shouldRowExpand,
  values
}) => {
  const [state, setState] = useState({
    data: values,
    expandedRows: []
  });
  const [allItemRows, setAllItemRows] = useState([]);

  useEffect(() => {
    setState({ ...state, data: values });
  }, [values]);

  useEffect(() => {
    if (state.data) {
      const arr = state.data.map(item => {
        const perItemRows = renderItem(item);
        return perItemRows;
      });

      setAllItemRows(arr);
    }
  }, [state]);

  useEffect(() => {
    if (hasSearchResult && searchKey) {
      const arrSearchResultIds = state.data.map(item => item.id);
      setState({ ...state, expandedRows: arrSearchResultIds });
    }
  }, [state.data, hasSearchResult]);

  useEffect(() => {
    if (shouldRowExpand) {
      const arrSearchResultIds = state.data.map(item => item.id);
      setState({ ...state, expandedRows: arrSearchResultIds });
    } else {
      setState({ ...state, expandedRows: [] });
    }
  }, [shouldRowExpand]);

  const handleRowClick = rowId => {
    const currentExpandedRows = state.expandedRows;
    const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);

    const newExpandedRows = isRowCurrentlyExpanded
      ? currentExpandedRows.filter(id => id !== rowId)
      : currentExpandedRows.concat(rowId);

    setState({ ...state, expandedRows: newExpandedRows });
  };

  const renderItem = item => {
    const hasExpandedRow = state.expandedRows.length;
    const isRowExpanded = state.expandedRows.includes(item.id);

    const itemRows = [
      <RowContainer key={'row-data-' + item.id}>
        <CellContainer paddingLeft={36}>{item.regionName}</CellContainer>
        {hasExpandedRow ? <CellContainer /> : null}
        <CellContainer>{`${convertDateTimeToLastUpdateFormat(item.updateDate)} by ${item.updatedBy}`}</CellContainer>
        {hasExpandedRow ? <CellContainer /> : null}
        <CellContainer>
          <SvgAction
            symbol={IcCreate}
            size={20}
            onClick={handleOnClickAction}
          />
        </CellContainer>
        <CellContainer>
          <SvgAction symbol={isRowExpanded ? IcAccordionHide : IcAccordionShow} size={10} onClick={() => handleRowClick(item.id)} />
        </CellContainer>
      </RowContainer>
    ];

    if (isRowExpanded) {
      handleExpandRow(true);
      itemRows.push(
        item.gpps.map(gpp => {
          return (
            <RowContainer key={'row-expanded-' + gpp.id}>
              <CellContainer paddingLeft={86} minWidth={210}>{gpp.country.countryName}</CellContainer>
              <CellContainer minWidth={180}>
                <LinkText onClick={() => handleLanguageClick({ ...gpp })}>{gpp.language.languageName}</LinkText>
              </CellContainer>
              <CellContainer minWidth={220}>{`${convertDateTimeToLastUpdateFormat(gpp.updateDate)} by ${gpp.updatedBy}`}</CellContainer>
              <CellContainer minWidth={63}>{gpp.isDisplayClientSite ? 'Active' : 'Inactive'}</CellContainer>
              <CellContainer minWidth={61}>
                <SvgAction
                  symbol={IcEdit}
                  onClick={() => handleOnClickAction({ gppId: gpp.id })}
                  size={20}
                />
              </CellContainer>
              <CellContainer minWidth={10} />
            </RowContainer>
          );
        })
      );
    }
    if (!hasExpandedRow) {
      handleExpandRow(false);
    }
    return itemRows;
  };

  return (
    <Fragment>{allItemRows}</Fragment>
  );
};

CollapsibleTableRow.defaultProps = defaultProps;
CollapsibleTableRow.propTypes = propTypes;

export default CollapsibleTableRow;
