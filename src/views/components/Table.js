import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import IcSortUp from '../../assets/icons/common/ic_sort_up.svg';
import IcSortDown from '../../assets/icons/common/ic_sort_down.svg';
import IcFilter from '../../assets/icons/common/ic_filter.svg';
import IcAccordionHide from '../../assets/icons/common/ic_accordion_hide.svg';
import IcAccordionShow from '../../assets/icons/common/ic_accordion_show.svg';

import SvgIcon from './SvgIcon';
import {
  SORT_ASCENDING,
  SORT_DESCENDING
} from '../../constants/sort';

const Container = styled('div')(({ theme }) => ({
  border: `1px solid ${theme.tableBorderColor}`,
  borderRadius: 26,
  backgroundColor: theme.white,
  minWidth: 1080
}));

const SortIcon = styled(SvgIcon)({
  height: 'auto',
  marginLeft: 10
});

const FilterIcon = styled(SvgIcon)({
  height: 'auto',
  marginLeft: 10
});

const AccordionIcon = styled(SvgIcon)({
  height: 'auto',
  cursor: 'pointer'
});

const TableContainer = styled('table')(({ display }) => ({
  width: '100%',
  display,
  borderCollapse: 'collapse'
}));

const TableBody = styled('tbody')(({ display, height }) => ({
  overflow: 'auto',
  display,
  height,
  minWidth: 1080
}));

const HeaderCellContainer = styled('th')(({
  theme,
  textAlign,
  width
}) => ({
  padding: '28px 0px',
  fontSize: 18,
  lineHeight: '24px',
  borderBottom: `1px solid ${theme.tableBorderColor}`,
  position: 'relative',
  width,
  textAlign,
  '&:first-of-type': {
    paddingLeft: 36
  },
  '&:last-of-type': {
    paddingRight: 36
  }
}));

const RowContainer = styled('tr')(({ theme }) => ({
  borderTop: `1px solid ${theme.tableBorderColor}`,
  padding: '16px 0'
}));

const CellContainer = styled('td')(({ theme }) => ({
  padding: '17px 35px 17px 0',
  fontSize: 16,
  '&:first-of-type': {
    padding: '17px 35px'
  }
}));

const FooterRowContainer = styled('tr')(({ theme }) => ({
  width: '100%',
  borderTop: `1px solid ${theme.tableBorderColor}`,
  padding: '29px 35px 28px'
}));

const FooterCellContainer = styled('td')({
  padding: '30px 35px'
});

const HeaderTitleContainer = styled('div')(({ hasSorting }) => ({
  display: 'inline-flex',
  cursor: hasSorting && 'pointer'
}));

const Table = ({
  children,
  className = 'table'
}) => {
  return (
    <Container className={className}>
      <TableContainer>
        {children}
      </TableContainer>
    </Container>
  );
};

const HeaderRow = ({ children }) => {
  return (
    <thead>
      <tr>{children}</tr>
    </thead>
  );
};

const headerCellPropTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  align: PropTypes.string,
  sort: PropTypes.oneOf([SORT_DESCENDING, SORT_ASCENDING])
};

const headerCellDefaultPropTypes = {
  align: 'center',
  onClick: () => { }
};

const HeaderCell = ({
  align,
  filter,
  hasRowExpanded,
  isAccordion,
  label,
  onClick,
  sort,
  width,
  children
}) => {
  return (
    <HeaderCellContainer textAlign={align} width={width}>
      <HeaderTitleContainer onClick={onClick} hasSorting={(sort !== undefined || filter)}>
        <span>{label}</span>
        {sort ? <SortIcon symbol={sort === SORT_ASCENDING ? IcSortUp : IcSortDown} size={18} /> : ''}
        {filter ? <FilterIcon symbol={IcFilter} size={18} /> : ''}
        {isAccordion ? <AccordionIcon symbol={hasRowExpanded ? IcAccordionHide : IcAccordionShow} size={10} /> : ''}
      </HeaderTitleContainer>
      {children}
    </HeaderCellContainer>
  );
};

const bodyPropTypes = {
  display: PropTypes.string,
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

const Body = ({ children, display, height }) => {
  return <TableBody display={display} height={height}>{children}</TableBody>;
};

const Row = ({ children }) => {
  return <RowContainer>{children}</RowContainer>;
};

const cellPropTypes = {
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ])
};

const Cell = ({ children, width, colSpan }) => {
  return <CellContainer width={width} colSpan={colSpan}>{children}</CellContainer>;
};

const Footer = ({ children }) => {
  return <tfoot><FooterRowContainer>{children}</FooterRowContainer></tfoot>;
};

Table.Header = HeaderRow;
Table.Row = Row;
Table.Footer = Footer;
Table.FooterCell = FooterCellContainer;

Table.Body = Body;
Table.Body.propTypes = bodyPropTypes;

Table.Cell = Cell;
Table.Cell.propTypes = cellPropTypes;

Table.HeaderCell = HeaderCell;
Table.HeaderCell.propTypes = headerCellPropTypes;
Table.HeaderCell.defaultProps = headerCellDefaultPropTypes;

export default Table;
