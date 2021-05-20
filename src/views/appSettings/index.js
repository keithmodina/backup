import React, { Fragment, useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import Loader from '../layouts/Loader';
import FillButton from '../components/FillButton';
import FlatButton from '../components/FlatButton';
import Table from '../components/Table';
import Text from '../components/Text';
import IcSearch from '../../assets/icons/common/ic_search.svg';
import RadioButton from '../components/RadioButton';
import Input from '../components/Input';
import Dropdown from '../components/Dropdown';
import EmptyContent from '../components/EmptyContent';
import userActionOptions from '../../constants/userActionsDropdownOptions';
import {
  ROUTE_SETTINGS_USER
} from '../../constants/routes';

import {
  ACTIVE_FILTER_KEY,
  INACTIVE_FILTER_KEY,
  ACTIVE_STATUS,
  INACTIVE_STATUS
} from '../../constants/privacyPolicyStatus';

import {
  SORT_ASCENDING,
  SORT_DESCENDING,
  EMAIL_SORT_KEY,
  LAST_LOGIN_SORT_KEY
} from '../../constants/sort';

import { actionNavigateTo } from '../../reduxModules/common/routes';
import { actionSetUserFilter, actionFetchUserList } from '../../reduxModules/appSettings';

import { getUserStatus } from '../../utils/statusMapper';
import isEmpty from '../../utils/isEmpty';

import emptyUserIcon from '../../assets/ic_empty_user.svg';

const ListContainer = styled('div')({
  '& .user-table': {
    borderRadius: '26px'
  }
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

const TitleContainer = styled('div')({
  display: 'flex',
  margin: '10px 0 41px'
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

const ButtonContainer = styled('div')({
  display: 'flex'
});

const SetPermissionButton = styled(FillButton)({
  padding: '8px 15px'
});

const TextButton = styled(FlatButton)(({ theme }) => ({
  color: theme.fillBtnBgColor,
  background: 'none',
  margin: '0 0 8px auto'
}));

const EmailTextButton = styled(TextButton)({
  fontWeight: 600
});

const ApplyButton = styled(TextButton)({
  fontWeight: 700,
  lineHeight: '24px'
});

const SettingsPage = ({
  userList,
  isFetchingListUser,
  filters,
  actionNavigateTo,
  actionSetUserFilter,
  actionFetchUserList
}) => {
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const [sortBy, setSortBy] = useState({
    [EMAIL_SORT_KEY]: SORT_ASCENDING,
    [LAST_LOGIN_SORT_KEY]: SORT_ASCENDING
  });
  const [statusFilter, setStatusFilter] = useState({
    [ACTIVE_FILTER_KEY]: true,
    [INACTIVE_FILTER_KEY]: true
  });

  const handleStatusFilter = filter => {
    const value = filter === ACTIVE_FILTER_KEY ? !statusFilter.isActive : !statusFilter.isInactive;
    setStatusFilter({
      ...statusFilter,
      [filter]: value
    });
  };

  useEffect(() => {
    if (!isEmpty(filters)) {
      setSearchKey(filters.keyword);
      setSortBy({ ...sortBy, [filters.sortType]: filters.sortDir });
      setStatusFilter({
        [ACTIVE_FILTER_KEY]: filters.isActiveFilter === ACTIVE_STATUS,
        [INACTIVE_FILTER_KEY]: filters.isActiveFilter === INACTIVE_STATUS
      });
    }

    actionFetchUserList({ ...filters });
  }, []);

  const sort = col => {
    const type = sortBy[col] === SORT_ASCENDING ? SORT_DESCENDING : SORT_ASCENDING;
    const defaultSort = {
      [EMAIL_SORT_KEY]: SORT_ASCENDING,
      [LAST_LOGIN_SORT_KEY]: SORT_ASCENDING
    };
    setSortBy({
      ...defaultSort,
      [col]: type
    });

    actionSetUserFilter({ ...filters, sortType: col, sortDir: type });
    actionFetchUserList({ ...filters, sortType: col, sortDir: type });
  };

  const handleTextChange = e => {
    setSearchKey(e.target.value);
  };

  const handleSearchEnter = () => {
    actionSetUserFilter({ ...filters, keyword: searchKey });
    actionFetchUserList({ ...filters, keyword: searchKey });
  };

  const handleApplyFilter = () => {
    let statusVal = null;

    if (!statusFilter[ACTIVE_FILTER_KEY] && statusFilter[INACTIVE_FILTER_KEY]) {
      statusVal = INACTIVE_STATUS;
    } if (statusFilter[ACTIVE_FILTER_KEY] && !statusFilter[INACTIVE_FILTER_KEY]) {
      statusVal = ACTIVE_STATUS;
    }

    actionSetUserFilter({ ...filters, isActiveFilter: statusVal });
    actionFetchUserList({ ...filters, isActiveFilter: statusVal });
    setShowStatusFilter(false);
  };

  const getEmptyContent = () => {
    return (
      <Fragment>
        <Text fontSize={16} bold>There are no items that match</Text>
        <Text fontSize={16} lineHeight={21} margin={10}>Try modifying your keywords</Text>
      </Fragment>
    );
  };

  return (
    <Fragment>
      <ListContainer>
        <TitleContainer>
          <Title fontSize={36} bold>
            Settings
          </Title>
          <ButtonContainer>
            <SetPermissionButton>
              Set Permissions
            </SetPermissionButton>
            <Dropdown
              width={144}
              title='More Actions'
              options={userActionOptions}
            />
          </ButtonContainer>
        </TitleContainer>
        <SearchContainer>
          <Input
            width={425}
            placeholder="Search name or email"
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
        <Table className="user-table">
          <Table.Header>
            <Table.HeaderCell
              align="left"
              label="Email"
              onClick={() => sort(EMAIL_SORT_KEY)}
              sort={sortBy[EMAIL_SORT_KEY]}
            />
            <Table.HeaderCell
              align="left"
              label="Name"
            />
            <Table.HeaderCell
              align="left"
              label="Role Group"
            />
            <Table.HeaderCell
              align="left"
              label="Last Login"
              onClick={() => sort(EMAIL_SORT_KEY)}
              sort={sortBy[EMAIL_SORT_KEY]}
            />
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
          </Table.Header>
          <Table.Body>
            {
              isFetchingListUser
                ? (
                  <Table.Row>
                    <Table.Cell colSpan={6}>
                      <Loader height={353} />
                    </Table.Cell>
                  </Table.Row>
                )
                : (
                  isEmpty(userList)
                    ? (
                      <Table.Row>
                        <Table.Cell colSpan={6}>
                          <EmptyContent height={510} icon={emptyUserIcon} content={getEmptyContent()} />
                        </Table.Cell>
                      </Table.Row>
                    )
                    : (userList.map(user => {
                      return (
                        <Table.Row key={user.id}>
                          <Table.Cell>
                            <EmailTextButton onClick={() => actionNavigateTo(ROUTE_SETTINGS_USER, { id: user.id })}>
                              {user.email}
                            </EmailTextButton>
                          </Table.Cell>
                          <Table.Cell>
                            {user.givenName + ' ' + user.familyName}
                          </Table.Cell>
                          <Table.Cell>
                            {user.roleGroup.roleName || ''}
                          </Table.Cell>
                          <Table.Cell>
                            ---
                          </Table.Cell>
                          <Table.Cell>
                            {getUserStatus(user.status)}
                          </Table.Cell>
                        </Table.Row>
                      );
                    })
                    )
                )
            }
          </Table.Body>
          {
            isEmpty(userList) ? ''
              : (
                <Table.Footer>
                  <Table.FooterCell colSpan="6" />
                </Table.Footer>
              )
          }
        </Table>
      </ListContainer>
    </Fragment>
  );
};

export default connect(state => ({
  userList: state.settings.userList,
  filters: state.settings.userFilter
}), {
  actionNavigateTo,
  actionSetUserFilter,
  actionFetchUserList
})(SettingsPage);
