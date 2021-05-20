import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

import BackButton from '../../components/BackButton';
import Text from '../../components/Text';
import FillButton from '../../components/FillButton';

import { getUserStatus } from '../../../utils/statusMapper';
import {
  ROUTE_SETTINGS
} from '../../../constants/routes';

const Container = styled('div')({
  height: '100%'
});

const HeaderContainer = styled('div')({
  display: 'flex',
  width: '100%',
  margin: '10px 0 42px',
  alignItems: 'center'
});

const PageHeader = styled('div')({
  fontSize: 36,
  fontWeight: 700,
  lineHeight: '44px',
  textAlign: 'left',
  marginRight: 'auto'
});

const UpdateBtn = styled(FillButton)({
  padding: '8px 15px',
  margin: 0,
  height: 40,
  minWidth: 0
});

const Content = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: 'auto',
  background: theme.white,
  border: `1px solid ${theme.detailsBorderColor}`,
  boxSizing: 'border-box',
  borderRadius: 26,
  padding: '16px 76px 27px 36px'
}));

const LabelText = styled(Text)(({ theme }) => ({
  fontSize: 14,
  lineHeight: '18px',
  color: theme.userDetailLabelColor,
  display: 'block',
  marginTop: 20
}));

const ValueText = styled(Text)({
  fontSize: 16,
  lineHeight: '21px',
  display: 'block'
});

const UserDetails = ({
  isFetchingUserDetails,
  userDetails
}) => {
  useEffect(() => {
    if (!isFetchingUserDetails) scrollToTop();
  }, [isFetchingUserDetails]);

  const scrollToTop = () => {
    const scroll = document.getElementById('scroll-view');
    scroll.scrollTop = 0;
  };

  return (
    <Fragment>
      <BackButton route={ROUTE_SETTINGS}>
        Go back to Settings
      </BackButton>
      {
        isFetchingUserDetails
          ? <h1>Loading...</h1>
          : (
            <Fragment>
              <HeaderContainer>
                <PageHeader>
                  {userDetails.email}
                </PageHeader>
                {/* to do change to update details */}
                <UpdateBtn>
                  Update
                </UpdateBtn>
              </HeaderContainer>
              <Container>
                <Content>
                  <table>
                    <tr>
                      <td>
                        <LabelText>First name</LabelText>
                        <ValueText>{userDetails.givenName}</ValueText>
                      </td>
                      <td>
                        <LabelText>Last name</LabelText>
                        <ValueText>{userDetails.familyName}</ValueText>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <LabelText>Role Group</LabelText>
                        <ValueText>{userDetails.roleGroup ? userDetails.roleGroup.roleName : ''}</ValueText>
                      </td>
                      <td>
                        <LabelText>Status</LabelText>
                        <ValueText>{getUserStatus(userDetails.status)}</ValueText>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <LabelText>Email</LabelText>
                        <ValueText>{userDetails.email}</ValueText>
                      </td>
                      <td>
                        {/* todo after identifying if last login is from incognito */}
                        <LabelText>Last login date</LabelText>
                        <ValueText>---</ValueText>
                      </td>
                    </tr>
                  </table>
                </Content>
              </Container>
            </Fragment>
          )
      }
    </Fragment>
  );
};

export default connect(state => ({
  location: state.location,
  isFetchingUserDetails: state.settings.isFetchingUserDetails,
  privacyPolicy: state.privacypolicy.privacyPolicyDetails,
  userDetails: state.settings.user
}), {
})(UserDetails);
