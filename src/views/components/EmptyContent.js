import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

import SvgIcon from './SvgIcon';
import LinkText from './LinkText';

const Container = styled('div')(({ theme, height }) => ({
  display: 'flex',
  width: '100%',
  height: height || 'calc(100vh - 366px)',
  background: theme.white,
  boxSizing: 'border-box',
  borderRadius: 26,
  margin: 'auto'
}));

const Icon = styled(SvgIcon)({
  margin: 'auto auto 18px',
  display: 'block',
  height: 100,
  width: 110
});

const CreateVersionLink = styled(LinkText)({
  display: 'block',
  width: 'auto',
  height: 21,
  fontWeight: 600,
  lineHeight: '21px',
  margin: '9px auto'
});

const Content = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 'auto'
});

const EmptyContent = ({ icon, content, height }) => {
  return (
    <Container height={height}>
      <Content>
        <Icon symbol={icon} />
        { content }
      </Content>
    </Container>
  );
};

export default EmptyContent;
