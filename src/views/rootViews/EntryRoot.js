import React, { lazy, Suspense } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import ViewPortLayer from '../components/ViewPortLayer';

const AppRoutes = lazy(() => import('../layouts/AppRoutes.js'));

const propTypes = {
  location: PropTypes.string.isRequired
};

const Container = styled(ViewPortLayer)(({ theme }) => ({
  height: '100vh',
  backgroundColor: theme.appEntryPageBgColor
}));

const EntryContainer = styled('div')({
  position: 'absolute',
  left: '50%',
  transform: 'translate(-50%, 0%)',
  minWidth: 574
});

const EntryRoot = ({
  location
}) => (
    <Container>
      <EntryContainer>
        <Suspense fallback={<div />}>
          <AppRoutes location={location} />
        </Suspense>
      </EntryContainer>
    </Container>
);

EntryRoot.propTypes = propTypes;

export default EntryRoot;
