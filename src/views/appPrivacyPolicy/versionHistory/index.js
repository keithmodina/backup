import React, { Fragment, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import cookie from 'js-cookie';

import BackButton from '../../components/BackButton';
import FillButton from '../../components/FillButton';
import FlatButton from '../../components/FlatButton';
import SvgIcon from '../../components/SvgIcon';
import Tab from '../../components/Tabs';
import Table from '../../components/Table';
import Text from '../../components/Text';
import Loader from '../../layouts/Loader';
import IcClock from '../../../assets/icons/common/ic_clock.svg';
import IcEdit from '../../../assets/icons/common/ic_edit.svg';
import IcDelete from '../../../assets/icons/common/ic_delete.svg';

import {
  convertDateTimeToSimpleDate,
  convertDateTimeToLastUpdateFormat
} from '../../../utils/dateConverter';
import {
  ROUTE_PRIVACY_POLICY_LIST,
  ROUTE_PRIVACY_POLICY_VERSION_CREATE,
  ROUTE_GPP_UPDATE,
  ROUTE_PRIVACY_POLICY_VERSION_UPDATE,
  ROUTE_PRIVACY_POLICY,
  ROUTE_PRIVACY_POLICY_VERSION_LIST
} from '../../../constants/routes';
import {
  SORT_ASCENDING,
  SORT_DESCENDING,
  UPDATE_DATE_SORT,
  VERSION_SORT
} from '../../../constants/sort';
import {
  COUNTRY,
  LANGUAGE
} from '../../../constants/storage';
import {
  versionHistory,
  TAB_VERSION_HISTORY
} from '../../../constants/tabs';

import { actionNavigateTo } from '../../../reduxModules/common/routes';
import { actionDeletePrivacyPolicy, actionFetchPrivacyPolicyVersionHistory } from '../../../reduxModules/appPrivacyPolicy';
import { actionOpenConfirmationDialog, actionCloseConfirmationDialog } from '../../../reduxModules/common/dialog';
import { ppVersionChecker } from '../../../utils/ppVersionChecker';

const HistoryContainer = styled('div')({
  '& .history-table': {
    borderRadius: '0 26px 26px'
  }
});

const TitleContainer = styled('div')({
  display: 'flex',
  margin: '10px 0 41px'
});

const Title = styled(Text)(({ theme }) => ({
  flex: 1,
  color: theme.primaryTextColor
}));

const ButtonContainer = styled('div')({});

const CreateButton = styled(FillButton)({
  padding: '8px 15px'
});

const UpdateButton = styled(FillButton)({
  marginLeft: 20,
  padding: '8px 15px'
});

const SubTitleContainer = styled('div')({
  display: 'flex'
});

const SubTitle = styled(Text)(({ theme }) => ({
  flex: 1,
  color: theme.primaryTextColor
}));

const TextButton = styled(FlatButton)(({ theme }) => ({
  color: theme.fillBtnBgColor,
  background: 'none',
  margin: '0 0 8px auto'
}));

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

const PrivacyPolicyVersionHistory = ({
  location,
  ppHistory,
  isPpVersionHistoryListPending,
  isPrivacyPolicyDeletePending,
  actionFetchPrivacyPolicyVersionHistory,
  actionNavigateTo,
  actionOpenConfirmationDialog,
  actionDeletePrivacyPolicy,
  actionCloseConfirmationDialog
}) => {
  const [latestGppId, setLatestGppId] = useState();
  const [activeSort, setActiveSort] = useState({
    [VERSION_SORT]: SORT_DESCENDING,
    [UPDATE_DATE_SORT]: SORT_ASCENDING
  });

  useEffect(() => {
    if (!isPrivacyPolicyDeletePending) actionCloseConfirmationDialog();
  }, [isPrivacyPolicyDeletePending]);

  useEffect(() => {
    if (ppHistory && ppHistory.data && ppHistory.data.history) {
      const latestGpp = ppHistory.data.history.filter(pp => pp.isLatest);
      if (latestGpp.length) {
        setLatestGppId(latestGpp[0].id);
      }
      if (ppHistory.data.history.length === 1) {
        actionNavigateTo(ROUTE_PRIVACY_POLICY, { id: ppHistory.data.history[0].id });
      }
    }
  }, [ppHistory]);

  const sort = col => {
    const type = activeSort[col] === SORT_ASCENDING ? SORT_DESCENDING : SORT_ASCENDING;
    const defaultSort = {
      [VERSION_SORT]: SORT_ASCENDING,
      [UPDATE_DATE_SORT]: SORT_ASCENDING
    };
    setActiveSort({
      ...defaultSort,
      [col]: type
    });

    actionFetchPrivacyPolicyVersionHistory(
      location.payload.id,
      `${col}_${type}`
    );
  };

  const deleteVersion = gpp => {
    const isOnlyVersion = ppHistory.data.history.length === 1;
    const messsage = ppVersionChecker(gpp.isLatest, isOnlyVersion);
    actionOpenConfirmationDialog({
      title: `Delete ${convertDateTimeToSimpleDate(gpp.version)}`,
      width: 504,
      content: <DeleteMessage>{messsage}</DeleteMessage>,
      affirmText: 'Delete',
      declineText: 'Cancel',
      onAffirm: async () => {
        await actionDeletePrivacyPolicy(gpp.id);
        actionFetchPrivacyPolicyVersionHistory(location.payload.id);
      }
    });
  };

  return (
    <Fragment>
      <BackButton route={ROUTE_PRIVACY_POLICY_LIST}>
        Go back to Manage GPP
      </BackButton>
        <HistoryContainer>
          <TitleContainer>
            <Title fontSize={36} bold>
              {
                ppHistory.data
                  ? `${ppHistory.data.countryName} / ${ppHistory.data.languageName}`
                  : `${cookie.get(COUNTRY)} / ${cookie.get(LANGUAGE)}`
              }
            </Title>
            <ButtonContainer>
              <CreateButton
                onClick={() => actionNavigateTo(ROUTE_PRIVACY_POLICY_VERSION_CREATE, { id: location.payload.id })}
              >
                Create new version
              </CreateButton>
              <UpdateButton
                inverted
                onClick={() => actionNavigateTo(ROUTE_GPP_UPDATE, { id: location.payload.id })}
              >
                Update Location/Language
              </UpdateButton>
            </ButtonContainer>
          </TitleContainer>
          <SubTitleContainer>
            <Tab.Buttons tabs={Object.values(versionHistory)} activeTab={TAB_VERSION_HISTORY} />
            {latestGppId
              && (
                <TextButton
                  onClick={() => actionNavigateTo(ROUTE_PRIVACY_POLICY, { id: latestGppId })}
                  fontSize={16}
                  bold
                >
                  <SvgClock symbol={IcClock} />
                  View latest
                </TextButton>
              )
            }
          </SubTitleContainer>
          <Table className="history-table">
            <Table.Header>
              <Table.HeaderCell
                align="left"
                label="Version"
                onClick={() => sort(VERSION_SORT)}
                sort={activeSort[VERSION_SORT]}
              />
              <Table.HeaderCell
                align="left"
                label="Last updated"
                onClick={() => sort(UPDATE_DATE_SORT)}
                sort={activeSort[UPDATE_DATE_SORT]}
              />
              <Table.HeaderCell align="left" label="Actions" />
            </Table.Header>
            <Table.Body>
              {
                isPpVersionHistoryListPending
                  ? (
                    <Table.Row>
                      <Table.Cell colSpan={6}>
                        <Loader height={353} />
                      </Table.Cell>
                    </Table.Row>
                  )
                  : ppHistory.data.history.map(pp => {
                    return (
                      <Table.Row key={pp.id}>
                        <Table.Cell>
                          <VerisionTextButton
                            onClick={() => actionNavigateTo(ROUTE_PRIVACY_POLICY, { id: pp.id })}
                          >
                            {convertDateTimeToSimpleDate(pp.version)}
                          </VerisionTextButton>
                        </Table.Cell>
                        <Table.Cell>
                          {`${convertDateTimeToLastUpdateFormat(pp.updateDate)} by ${pp.updatedBy}`}
                        </Table.Cell>
                        <Table.Cell>
                          <SvgEdit
                            onClick={() => actionNavigateTo(ROUTE_PRIVACY_POLICY_VERSION_UPDATE, { id: pp.id })}
                            symbol={IcEdit}
                          />
                          <SvgDelete
                            onClick={() => deleteVersion(pp)}
                            symbol={IcDelete}
                          />
                        </Table.Cell>
                      </Table.Row>
                    );
                  })
              }
            </Table.Body>
            <Table.Footer>
              <Table.FooterCell colSpan="6" />
            </Table.Footer>
          </Table>
        </HistoryContainer>
    </Fragment>
  );
};

export default connect(state => ({
  location: state.location,
  ppHistory: state.privacypolicy.privacyPolicyVersionHistory,
  isPpVersionHistoryListPending: state.privacypolicy.isPpVersionHistoryListPending,
  isPrivacyPolicyDeletePending: state.privacypolicy.isPrivacyPolicyDeletePending
}), {
  actionFetchPrivacyPolicyVersionHistory,
  actionNavigateTo,
  actionOpenConfirmationDialog,
  actionDeletePrivacyPolicy,
  actionCloseConfirmationDialog
})(PrivacyPolicyVersionHistory);
