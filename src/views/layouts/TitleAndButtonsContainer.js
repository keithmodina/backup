import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import cookie from 'js-cookie';
import { format } from 'date-fns';

import isEmpty from '../../utils/isEmpty';
import { isContentEmpty } from '../../utils/contentValidation';

import { COUNTRY, LANGUAGE } from '../../constants/storage';
import { ROUTE_GPP_CREATE } from '../../constants/routes';
import { actionOpenConfirmationDialog, actionCloseConfirmationDialog } from '../../reduxModules/common/dialog';
import { actionUpdateGppDetails } from '../../reduxModules/appGpp';

const GobackLink = styled('a')(({ theme }) => ({
  fontFamily: 'SamsungOne',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: 16,
  lineHeight: '21px',
  display: 'flex',
  alignItems: 'center',
  margin: '0 0 10px 0px',
  height: 21,
  color: theme.clickableTextColor,
  cursor: 'pointer'
}));

const TitleWithButtonContainer = styled('div')({
  display: 'inline-flex',
  marginBottom: 40,
  width: '100%',
  alignItems: 'center'
});

const Title = styled('div')(({ theme }) => ({
  fontFamily: 'SamsungOne',
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: 36,
  lineHeight: '44px',
  color: theme.primaryTextColor,
  width: '100%',
  height: 44,
  marginRight: 40
}));

const ButtonContainer = styled('div')({
  width: 'auto',
  height: 40,
  display: 'flex'
});

const SubmitButton = styled('button')(({ theme, isPrimary }) => ({
  fontFamily: 'SamsungOne',
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: 16,
  lineHeight: '24px',
  alignItems: 'center',
  textAlign: 'center',
  color: isPrimary ? theme.fillBtnHoverBgColor : theme.white,
  height: 40,
  width: isPrimary ? 122 : 84,
  borderRadius: 26,
  border: isPrimary ? `1px solid ${theme.fillBtnHoverBgColor}` : 0,
  backgroundColor: isPrimary ? theme.white : theme.primaryColor,
  position: 'relative',
  cursor: 'pointer',
  '&:disabled': {
    backgroundColor: theme.fillBtnDisabledBgColor,
    pointerEvents: 'none'
  }
}));

const TitleAndButtonsContainer = ({
  title,
  countryName,
  languageName,
  newContent,
  version,
  isOptionsEmpty,
  privacyPolicy,
  isCreate,
  handleOnclick,
  actionOpenConfirmationDialog,
  actionCloseConfirmationDialog,
  actionUpdateGppDetails,
  prevLocation,
  createdGppId
}) => {
  const dateFormat = date => format(new Date(date), 'MMMM dd, yyyy');

  const goBackLink = () => {
    if (hasChanges(isCreate, version, newContent)) {
      actionOpenConfirmationDialog({
        title: 'Discard changes',
        width: 504,
        content: <div style={{ fontSize: 14 }}>Are you sure you want to cancel? You will lose recent changes.</div>,
        affirmText: 'Discard',
        declineText: 'Cancel',
        onAffirm: async () => {
          if (prevLocation === ROUTE_GPP_CREATE) actionUpdateGppDetails(createdGppId, { isDisplayClientSite: false }, prevLocation);
          window.history.back();
          actionCloseConfirmationDialog();
        }
      });
    } else {
      if (prevLocation === ROUTE_GPP_CREATE) actionUpdateGppDetails(createdGppId, { isDisplayClientSite: false }, prevLocation);
      window.history.back();
    }
  };

  const hasChanges = (isCreate, version, content) => {
    let isDateUpdated = false;
    let isContentUpdated = false;

    if (isCreate) {
      return !isEmpty(version) || !isEmpty(content);
    } if (!isEmpty(version)) {
      isDateUpdated = dateFormat(version) !== dateFormat(privacyPolicy.version);
    } if (!isEmpty(content)) {
      isContentUpdated = content !== privacyPolicy.content;
    } return isDateUpdated || isContentUpdated;
  };

  const isBtnEnabled = () => isEmpty(version) && isContentEmpty(newContent) && isOptionsEmpty;

  return (
    <Fragment>
      <GobackLink onClick={() => goBackLink()}>
        {`< Go back to ${countryName || cookie.get(COUNTRY)}/${languageName || cookie.get(LANGUAGE)} GPP`}
      </GobackLink>
      <TitleWithButtonContainer>
        <Title>
          {title}
        </Title>
        <ButtonContainer>
          {/* <SubmitButton isPrimary>Save as draft</SubmitButton> */}
          <SubmitButton
            onClick={handleOnclick}
            disabled={isBtnEnabled()}
          >
            Publish
          </SubmitButton>
        </ButtonContainer>
      </TitleWithButtonContainer>
    </Fragment>
  );
};

export default connect(state => ({
  privacyPolicy: state.privacypolicy.privacyPolicyDetails,
  prevLocation: state.location.prev.type,
  createdGppId: state.gpp.gppDetails._id
}), {
  actionOpenConfirmationDialog,
  actionCloseConfirmationDialog,
  actionUpdateGppDetails
})(TitleAndButtonsContainer);
