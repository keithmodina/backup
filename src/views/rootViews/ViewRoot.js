import React, { lazy, Suspense } from 'react';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import cookie from 'js-cookie';

import ViewPortLayer from '../components/ViewPortLayer';
import Scrollbar from '../layouts/Scrollbar';

import { FULL_NAME, EMAIL } from '../../constants/storage';

import { actionToggleUserDrawer } from '../../reduxModules/common/user';

const AppRoutes = lazy(() => import('../layouts/AppRoutes.js'));
const Sidebar = lazy(() => import('../layouts/Sidebar'));
const Header = lazy(() => import('../layouts/Header'));
const Footer = lazy(() => import('../layouts/Footer'));

const ContextLayer = styled('div')({
  width: 'auto',
  height: '100%',
  display: 'flex'
});

const AppPageContext = styled(ViewPortLayer)(({ theme }) => ({
  backgroundColor: theme.mainBGColor,
  height: '100vh',
  width: '100%',
  display: 'flex'
}), {
  position: 'relative',
  flexDirection: 'column',
  flex: '1 auto'
});

const BodyContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  height: '100%',
  background: theme.bodyColor
}));

const ContentContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
  padding: '60px 40px 0'
}));

const MainViewContainer = styled('div')({
  width: 'auto',
  height: 'auto',
  position: 'relative',
  flex: '1 auto',
  display: 'flex',
  flexDirection: 'column',
  minWidth: 1080
});

const AppRoutesContainer = styled('div')({
  height: 'auto'
});

const ViewRoot = ({
  actionToggleUserDrawer,
  isDrawerVisible,
  location
}) => {
  const onContextLayerClick = e => {
    if (isDrawerVisible) {
      actionToggleUserDrawer(false);
    }
  };

  return (
    <ContextLayer onClick={e => { onContextLayerClick(e); }}>
      <AppPageContext id="AppPageContext">
        <Header email={cookie.get(EMAIL) || ''} name={cookie.get(FULL_NAME) || ''} />
        <BodyContainer>
          <Sidebar />
          <Scrollbar className="Scrollbar">
            <ContentContainer>
              <MainViewContainer>
                <AppRoutesContainer>
                  <Suspense fallback={<div />}>
                    <AppRoutes location={location} />
                  </Suspense>
                </AppRoutesContainer>
              </MainViewContainer>
              <Footer />
            </ContentContainer>
          </Scrollbar>
        </BodyContainer>
      </AppPageContext>
    </ContextLayer>
  );
};

export default connect(state => ({
  isDrawerVisible: state.common.user.isDrawerVisible
}), {
  actionToggleUserDrawer
})(ViewRoot);
