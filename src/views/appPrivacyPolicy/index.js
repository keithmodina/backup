import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import cookie from 'js-cookie';

import Table from '../components/Table';
import CollapsibleTableRow from './CollapsibleTableRow';
import Text from '../components/Text';

import FlatButton from '../components/FlatButton';
import SvgIcon from '../components/SvgIcon';
import Input from '../components/Input';
import RadioButton from '../components/RadioButton';

import {
  GPP_ID,
  COUNTRY,
  LANGUAGE
} from '../../constants/storage';
import {
  ROUTE_PRIVACY_POLICY,
  ROUTE_PRIVACY_POLICY_NO_PUBLISHED_VERSION,
  ROUTE_GPP_UPDATE,
  ROUTE_GPP_CREATE
} from '../../constants/routes';
import {
  SORT_ASCENDING,
  SORT_DESCENDING,
  NAME_SORT_KEY,
  DATE_SORT_KEY
} from '../../constants/sort';
import {
  ACTIVE_FILTER_KEY,
  INACTIVE_FILTER_KEY,
  ACTIVE_STATUS,
  INACTIVE_STATUS
} from '../../constants/privacyPolicyStatus';

import { actionNavigateTo } from '../../reduxModules/common/routes';
import { actionFetchPrivacyPolicyList, actionSetGppFilters } from '../../reduxModules/appPrivacyPolicy';
import { actionOpenConfirmationDialog } from '../../reduxModules/common/dialog';

import Loader from '../layouts/Loader';

import IcSearch from '../../assets/icons/common/ic_search.svg';
import isEmpty from '../../utils/isEmpty';

const TitleContainer = styled('div')({
  display: 'flex',
  margin: '0 0 10px'
});

const Title = styled(Text)(({ theme }) => ({
  flex: 1,
  color: theme.primaryTextColor
}));

const SearchContainer = styled('div')({
  marginBottom: 20,
  display: 'flex',
  flexDirection: 'row-reverse'
});

const TextButton = styled(FlatButton)(({ theme }) => ({
  color: theme.fillBtnBgColor,
  background: 'none'
}));

const ApplyButton = styled(TextButton)({
  fontWeight: 700,
  lineHeight: '24px'
});

const VerisionTextButton = styled(TextButton)({
  fontWeight: 600
});

const SvgClock = styled(SvgIcon)(({ theme }) => ({
  width: 18,
  height: 18,
  marginRight: 16
}));

const SvgEdit = styled(SvgIcon)({
  width: 20,
  height: 20,
  cursor: 'pointer'
});

const SvgDelete = styled(SvgEdit)({
  marginLeft: 20
});

const DeleteMessage = styled('div')({
  fontSize: 14
});

const StatusContainer = styled('div')(({ theme, show }) => ({
  display: show ? 'block' : 'none',
  position: 'absolute',
  width: 126,
  height: 131,
  borderRadius: 26,
  background: theme.white,
  border: `1px solid ${theme.inputBorderColor}`,
  padding: 15,
  marginTop: 28,
  '& > div': {
    margin: 0,
    marginBottom: 8,
    paddingBottom: 11,
    borderBottom: `1px solid ${theme.inputBorderColor}`
  }
}));

const PrivacyPolicyPage = ({
  actionFetchPrivacyPolicyList,
  actionNavigateTo,
  actionOpenConfirmationDialog,
  actionSetGppFilters,
  errorData,
  isFetchSuccess,
  isfetchError,
  isfetchPending,
  listData,
  location,
  filters
}) => {
  const [sortBy, setSortBy] = useState({
    [NAME_SORT_KEY]: SORT_ASCENDING,
    [DATE_SORT_KEY]: SORT_ASCENDING
  });
  const [statusFilter, setStatusFilter] = useState({
    [ACTIVE_FILTER_KEY]: true,
    [INACTIVE_FILTER_KEY]: true
  });
  const [isRowExpanded, setRowExpanded] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const [shouldRowExpand, setShouldRowExpand] = useState(false);
  const [hasSearchResult, setHasSearchResult] = useState(false);
  const [showStatusFilter, setShowStatusFilter] = useState(false);

  useEffect(() => {
    if (!isEmpty(filters)) {
      setSearchKey(filters.keyword);
      setSortBy({ ...sortBy, [filters.sortType]: filters.sortDir });
      setStatusFilter({
        [ACTIVE_FILTER_KEY]: filters.isActiveFilter === ACTIVE_STATUS,
        [INACTIVE_FILTER_KEY]: filters.isActiveFilter === INACTIVE_STATUS
      });
    }

    actionFetchPrivacyPolicyList({ ...filters });
    setShouldRowExpand(!isEmpty(Object.values(filters)));
  }, []);

  useEffect(() => {
    if (isFetchSuccess && filters.keyword) {
      setShouldRowExpand(true);
    }
  }, [isFetchSuccess]);

  useEffect(() => {
    if (listData && shouldRowExpand) {
      setHasSearchResult(true);
    }
  }, [listData]);

  const sort = col => {
    const type = sortBy[col] === SORT_ASCENDING ? SORT_DESCENDING : SORT_ASCENDING;
    const defaultSort = {
      [NAME_SORT_KEY]: SORT_ASCENDING,
      [DATE_SORT_KEY]: SORT_ASCENDING
    };
    setSortBy({
      ...defaultSort,
      [col]: type
    });

    actionSetGppFilters({ ...filters, sortType: col, sortDir: type });
    actionFetchPrivacyPolicyList({ ...filters, sortType: col, sortDir: type });
  };

  const handleTextChange = e => {
    setSearchKey(e.target.value);
  };

  const handleSearchEnter = () => {
    actionSetGppFilters({ ...filters, keyword: searchKey });
    actionFetchPrivacyPolicyList({ ...filters, keyword: searchKey });

    if (searchKey) {
      setShouldRowExpand(true);
    } else {
      setShouldRowExpand(false);
    }
  };

  const handleExpandRow = isExpanded => {
    setRowExpanded(isExpanded);
    if (!isExpanded) setShowStatusFilter(false);
  };

  const handleLanguageClick = item => {
    cookie.set(GPP_ID, item.id);
    cookie.set(COUNTRY, item.country.countryName);
    cookie.set(LANGUAGE, item.language.languageName);
    if (!isEmpty(item.pp)) actionNavigateTo(ROUTE_PRIVACY_POLICY, { id: item.pp });
    else actionNavigateTo(ROUTE_PRIVACY_POLICY_NO_PUBLISHED_VERSION);
  };

  const handleOnClickAction = (args = {}) => {
    if (!('gppId' in args)) {
      actionNavigateTo(ROUTE_GPP_CREATE);
    } else {
      actionNavigateTo(ROUTE_GPP_UPDATE, { id: args.gppId });
    }
  };

  const handleStatusFilter = filter => {
    const value = filter === ACTIVE_FILTER_KEY ? !statusFilter.isActive : !statusFilter.isInactive;
    setStatusFilter({
      ...statusFilter,
      [filter]: value
    });
  };

  const handleApplyFilter = () => {
    let statusVal = null;

    if (!statusFilter[ACTIVE_FILTER_KEY] && statusFilter[INACTIVE_FILTER_KEY]) {
      statusVal = INACTIVE_STATUS;
    } if (statusFilter[ACTIVE_FILTER_KEY] && !statusFilter[INACTIVE_FILTER_KEY]) {
      statusVal = ACTIVE_STATUS;
    }

    actionSetGppFilters({ ...filters, isActiveFilter: statusVal });
    actionFetchPrivacyPolicyList({ ...filters, isActiveFilter: statusVal });
    setShowStatusFilter(false);
    setShouldRowExpand(true);
  };

  return (
    <Fragment>
      <TitleContainer>
        <Title fontSize={36} bold>Manage GPP</Title>
      </TitleContainer>
      <SearchContainer>
        <Input
          width={425}
          placeholder="Search by location or language"
          hasIcon
          icon={IcSearch}
          value={searchKey}
          onChange={handleTextChange}
          handleIconClick={handleSearchEnter}
          onKeyDown={e => {
            if (e.keyCode === 13) handleSearchEnter();
          }}
        />
      </SearchContainer>
      <Table>
        <Table.Header>
          <Table.HeaderCell
            align="left"
            label="Name"
            onClick={() => sort(NAME_SORT_KEY)}
            sort={sortBy[NAME_SORT_KEY]}
            width={isRowExpanded ? 210 : 390}
          />
          {
            isRowExpanded
              ? (
                <Table.HeaderCell
                  align="left"
                  label=""
                  width={180}
                />
              )
              : null
          }
          <Table.HeaderCell
            align="left"
            label="Last updated"
            onClick={() => sort(DATE_SORT_KEY)}
            sort={sortBy[DATE_SORT_KEY]}
            width={isRowExpanded ? 220 : 283}
          />
          {
            isRowExpanded
              ? (
                <Table.HeaderCell
                  align="left"
                  label="Status"
                  onClick={() => setShowStatusFilter(!showStatusFilter)}
                  width={63}
                  filter
                >
                  <StatusContainer show={showStatusFilter}>
                    <RadioButton
                      checked={statusFilter[ACTIVE_FILTER_KEY]}
                      textLabel="Active"
                      fieldName="Active Status"
                      disabled={false}
                      onClick={() => handleStatusFilter(ACTIVE_FILTER_KEY)}
                    />
                    <RadioButton
                      checked={statusFilter[INACTIVE_FILTER_KEY]}
                      textLabel="Inactive"
                      fieldName="Inactive Status"
                      disabled={false}
                      onClick={() => handleStatusFilter(INACTIVE_FILTER_KEY)}
                    />
                    <ApplyButton onClick={handleApplyFilter}>Apply</ApplyButton>
                  </StatusContainer>
                </Table.HeaderCell>
              )
              : null
          }
          <Table.HeaderCell align="left" label="Actions" width={61} />
          <Table.HeaderCell
            align="left"
            label=""
            width={10}
            isAccordion
            hasRowExpanded={isRowExpanded}
            onClick={() => setShouldRowExpand(!shouldRowExpand)}
          />
        </Table.Header>
        <Table.Body>
          {
            isfetchPending
              ? (
                <Table.Row>
                  <Table.Cell colSpan={isRowExpanded ? 6 : 4}>
                    <Loader height={353} />
                  </Table.Cell>
                </Table.Row>
              )
              : listData
                ? (
                  <CollapsibleTableRow
                    values={listData}
                    handleExpandRow={handleExpandRow}
                    handleLanguageClick={handleLanguageClick}
                    handleOnClickAction={handleOnClickAction}
                    shouldRowExpand={shouldRowExpand}
                    hasSearchResult={hasSearchResult}
                    searchKey={searchKey}
                  />
                )
                : ''
          }
        </Table.Body>
        <Table.Footer>
          <Table.FooterCell colSpan="6" />
        </Table.Footer>
      </Table>
    </Fragment>
  );
};

export default connect(state => ({
  errorData: state.privacypolicy.privacyPolicyListErrorData,
  isFetchSuccess: state.privacypolicy.isfetchPrivacyPolicyListSuccess,
  isfetchError: state.privacypolicy.isfetchPrivacyPolicyListError,
  isfetchPending: state.privacypolicy.isfetchPrivacyPolicyListPending,
  listData: state.privacypolicy.privacyPolicyList,
  filters: state.privacypolicy.gppFilter,
  location: state.location
}), {
  actionFetchPrivacyPolicyList,
  actionNavigateTo,
  actionOpenConfirmationDialog,
  actionSetGppFilters
})(PrivacyPolicyPage);
