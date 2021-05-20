import React from 'react';
import styled from '@emotion/styled';

import Text from '../components/Text';

const TitleWrapper = styled('div')({
  textAlign: 'center',
  width: '100%',
  margin: '123px auto 90px',
  height: 'auto',
  lineHeight: 'normal'
});

const TextWrapper = styled(Text)({
  fontFamily: 'SamsungSharp',
  fontWeight: 'bold',
  fontStretch: 'normal',
  fontStyle: 'normal',
  lineHeight: 'normal',
  letterSpacing: 'normal',
  fontSize: 36
});

const Title = ({ content, fontSize }) => (
  <TitleWrapper>
    <TextWrapper fontSize={fontSize}>{content}</TextWrapper>
  </TitleWrapper>
);

export default Title;
