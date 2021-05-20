import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import DOMPurify from 'dompurify';
import cookie from 'js-cookie';
import styled from '@emotion/styled';

import isEmpty from '../../../utils/isEmpty';
import { ppVersionChecker } from '../../../utils/ppVersionChecker';

import {
  convertDateTimeToSimpleDate,
  convertDateTimeToLastUpdateFormat
} from '../../../utils/dateConverter';
import actionOptions from '../../../constants/actionsDropdownOptions';

import gppIcon from '../../../assets/ic_gpp.svg';
import historyIcon from '../../../assets/ic_history.svg';
import IcClock from '../../../assets/icons/common/ic_clock.svg';

import BackButton from '../../components/BackButton';
import SvgIcon from '../../components/SvgIcon';
import Text from '../../components/Text';
import FillButton from '../../components/FillButton';
import LinkText from '../../components/LinkText';
import Dropdown from '../../components/Dropdown';
import EmptyContent from '../../components/EmptyContent';
import Table from '../../components/Table';
import Tab from '../../components/Tab';

import {
  actionFetchPrivacyPolicyDetails,
  actionFetchPrivacyPolicyVersionHistory,
  actionDeletePrivacyPolicy
} from '../../../reduxModules/appPrivacyPolicy';
import {
  actionOpenConfirmationDialog,
  actionCloseConfirmationDialog
} from '../../../reduxModules/common/dialog';
import { actionNavigateTo } from '../../../reduxModules/common/routes';

import {
  ROUTE_PRIVACY_POLICY_LIST,
  ROUTE_PRIVACY_POLICY_VERSION_CREATE,
  ROUTE_PRIVACY_POLICY_VERSION_LIST,
  ROUTE_PRIVACY_POLICY_UPDATE,
  ROUTE_GPP_UPDATE
} from '../../../constants/routes';
import {
  COUNTRY,
  LANGUAGE,
  GPP_ID
} from '../../../constants/storage';
import config from '../../../constants/serverConfig';

import ExpandedTableRow from './ExpandedTableRow';

const Container = styled('div')({
  height: '100%'
});

const HeaderContainer = styled('div')({
  display: 'flex',
  width: '100%',
  margin: '10px 0 20px',
  alignItems: 'center'
});

const PageHeader = styled('div')({
  fontSize: 36,
  fontWeight: 700,
  lineHeight: '44px',
  textAlign: 'left',
  marginRight: 'auto'
});

const CreateVersionBtn = styled(FillButton)({
  padding: '8px 15px',
  margin: 0
});

const ViewButtons = styled('div')({
  display: 'inline-flex',
  width: '100%',
  margin: '0 0 20px auto'
});

const FlatButton = styled(LinkText)(({ height, margin }) => ({
  display: 'flex',
  width: 'auto',
  fontSize: 16,
  fontWeight: 600,
  lineHeight: '21px',
  background: 'transparent',
  margin,
  height
}));

const PrivacyPolicy = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: 'auto',
  background: theme.white,
  border: `1px solid ${theme.detailsBorderColor}`,
  boxSizing: 'border-box',
  borderRadius: 26,
  padding: 36
}));

const Details = styled('div')(({ theme }) => ({
  display: 'block',
  width: '100%',
  height: 72,
  marginBottom: 20,
  paddingBottom: 10,
  borderBottom: `1px solid ${theme.detailsDividerColor}`
}));

const InlineText = styled(Text)({
  display: 'block',
  marginBottom: 10
});

const PrivacyPolicyDetails = ({
  location,
  isFetchingPrivacyPolicy,
  privacyPolicy,
  actionNavigateTo,
  actionFetchPrivacyPolicyDetails,
  actionFetchPrivacyPolicyVersionHistory,
  actionDeletePrivacyPolicy,
  actionOpenConfirmationDialog,
  actionCloseConfirmationDialog
}) => {
  useEffect(() => {
    window.addEventListener('click', handleUserKeyDown);

    return () => {
      window.removeEventListener('click', handleUserKeyDown);
    };
  }, []);

  useEffect(() => {
    const { id } = location.payload;

    if (!isEmpty(id)) {
      actionFetchPrivacyPolicyDetails(id);
    }
  }, [location]);

  useEffect(() => {
    if (!isFetchingPrivacyPolicy) scrollToTop();
  }, [isFetchingPrivacyPolicy]);

  const scrollToTop = () => {
    const scroll = document.getElementById('scroll-view');
    scroll.scrollTop = 0;
  };

  const handleUserKeyDown = event => {
    const { target } = event;
    const tag = target.closest('a');

    if (tag && tag.hasAttribute('href')) {
      const link = tag.getAttribute('href');
      const [origin, id] = link.split('#');
      if (origin === '' || origin === config.CLIENT_BASE_URL) scrollToView(event, id);
    }
  };

  const scrollToView = (e, id) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  const getPolicy = content => <div className="content" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content, { ADD_ATTR: ['target'] }) }} />;

  const getEmptyContent = gppId => {
    return (
      <Fragment>
        <Text fontSize={16}>There is no published version yet</Text>
        <FlatButton
          height={21}
          margin="9px auto"
          onClick={() => actionNavigateTo(ROUTE_PRIVACY_POLICY_VERSION_CREATE, { id: gppId || cookie.get(GPP_ID) })}
        >
          Create a new one
        </FlatButton>
      </Fragment>
    );
  };

  const handleOnClickOption = option => {
    switch (option) {
      case 0: return actionNavigateTo(ROUTE_GPP_UPDATE, { id: cookie.get(GPP_ID) });
      case 1: return actionNavigateTo(ROUTE_PRIVACY_POLICY_UPDATE, { id: location.payload.id });
      case 2: return deleteVersion(privacyPolicy);
      default:
    }
  };

  const deleteVersion = async pp => {
    const { versions } = await actionFetchPrivacyPolicyVersionHistory(pp.gpp);
    const isOnlyVersion = versions && versions.history.length === 1;
    const messsage = ppVersionChecker(pp.isLatest, isOnlyVersion);

    actionOpenConfirmationDialog({
      title: `Delete ${convertDateTimeToSimpleDate(pp.version)}`,
      width: 504,
      content: <div style={{ fontSize: 14 }}>{messsage}</div>,
      affirmText: 'Delete',
      declineText: 'Cancel',
      onAffirm: async () => {
        await actionDeletePrivacyPolicy(location.payload.id);
        actionCloseConfirmationDialog();
        actionNavigateTo(ROUTE_PRIVACY_POLICY_LIST);
      }
    });
  };

  const detailsComp = () => {
    return (
      <Details>
        <InlineText>
          <Text fontSize={16} margin="0 20px 0 0">{`Published by ${privacyPolicy.publishedBy}`}</Text>
          <Text fontSize={16}>
            {`Last updated ${privacyPolicy.updateDate && convertDateTimeToLastUpdateFormat(privacyPolicy.updateDate)}`}
          </Text>
          <Text fontSize={16}>
            {!isEmpty(privacyPolicy.updatedBy) && ` by ${privacyPolicy.updatedBy}`}
          </Text>
        </InlineText>
        <InlineText>
          <Text bold fontSize={16} margin="0 10px 0 0">{privacyPolicy.isLatest ? 'Latest version' : 'Version'}</Text>
          <Text fontSize={16}>{privacyPolicy.updateDate && convertDateTimeToSimpleDate(privacyPolicy.version)}</Text>
        </InlineText>
      </Details>
    );
  };

  const options = () => {
    return (
      <div>
        {detailsComp()}
        <Table>
          <Table.Header>
            <Table.HeaderCell
              align="left"
              label="ID"
            />
            <Table.HeaderCell
              align="left"
              label="Title"
            />
          </Table.Header>
          <Table.Body>
            <ExpandedTableRow values={privacyPolicy.options || []} />
          </Table.Body>
          <Table.Footer>
            <Table.FooterCell colSpan="2" />
          </Table.Footer>
        </Table>
      </div>
    );
  };

  const content = () => {
    return (
      <div>
        {detailsComp()}
        {getPolicy(privacyPolicy.content)}
      </div>
    );
  };

  const tabData = [{
    title: 'Content',
    id: 'content',
    component: content()
  }, {
    title: 'Options',
    id: 'options',
    component: options()
  }];

  return (
    <Fragment>
      <BackButton route={ROUTE_PRIVACY_POLICY_LIST}>
        Go back to Manage GPP
      </BackButton>
      {
        isFetchingPrivacyPolicy
          ? <h1>Loading...</h1>
          : (
            <Fragment>
              <HeaderContainer>
                <PageHeader>
                  {
                    `${privacyPolicy.countryName || cookie.get(COUNTRY)}
                    / ${privacyPolicy.language || cookie.get(LANGUAGE)}`
                  }
                </PageHeader>
                <CreateVersionBtn onClick={() => actionNavigateTo(ROUTE_PRIVACY_POLICY_VERSION_CREATE, { id: privacyPolicy.gpp || cookie.get(GPP_ID) })}>
                  Create new version
                </CreateVersionBtn>
                <Dropdown
                  title='Actions'
                  options={actionOptions}
                  handleOnClickOption={handleOnClickOption}
                  isEditDisabled={isEmpty(privacyPolicy)}
                  isDeleteDisabled={isEmpty(privacyPolicy)}
                />
              </HeaderContainer>
              {
                isEmpty(privacyPolicy)
                  ? <EmptyContent icon={gppIcon} content={getEmptyContent(privacyPolicy.gpp)} />
                  : (
                    <Fragment>
                      <ViewButtons>
                        {
                          !privacyPolicy.isLatest && (
                            <FlatButton
                              height={24}
                              margin="0 0 0 auto"
                              onClick={() => actionFetchPrivacyPolicyDetails(privacyPolicy.latestVersion)}
                            >
                              <SvgIcon symbol={IcClock} />
                              <Text bold clickable margin="auto 0 auto 15px">View latest</Text>
                            </FlatButton>
                          )
                        }
                        {
                          privacyPolicy.hasVersions && (
                            <FlatButton
                              height={24}
                              margin={privacyPolicy.isLatest && '0 0 0 auto'}
                              onClick={() => actionNavigateTo(ROUTE_PRIVACY_POLICY_VERSION_LIST, { id: privacyPolicy.gpp })}
                            >
                              <SvgIcon symbol={historyIcon} />
                              <Text bold clickable margin="auto 0 auto 15px">View History</Text>
                            </FlatButton>
                          )
                        }
                      </ViewButtons>
                      <Tab tabData={tabData} />
                    </Fragment>
                  )
              }
            </Fragment>
          )
      }
    </Fragment>
  );
};

export default connect(state => ({
  location: state.location,
  isFetchingPrivacyPolicy: state.privacypolicy.isFetchingPrivacyPolicy,
  privacyPolicy: state.privacypolicy.privacyPolicyDetails
}), {
  actionNavigateTo,
  actionFetchPrivacyPolicyDetails,
  actionFetchPrivacyPolicyVersionHistory,
  actionDeletePrivacyPolicy,
  actionOpenConfirmationDialog,
  actionCloseConfirmationDialog
})(PrivacyPolicyDetails);
