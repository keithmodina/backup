import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import styled from '@emotion/styled';

import themes from '../../styles/themes';
import ViewPortLayer from '../components/ViewPortLayer';

const Container = styled(ViewPortLayer)({
  userSelect: 'none'
});

const ThemeRoot = ({ children }) => (
  <ThemeProvider theme={themes.default}>
    <Container>
      {children}
    </Container>
  </ThemeProvider>
);

export default ThemeRoot;
