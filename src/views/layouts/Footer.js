import React from 'react';
import styled from '@emotion/styled';

import ImgFooterLogo from '../../assets/icons/common/logo_footer.svg';
import Text from '../components/Text';
import SvgIcon from '../components/SvgIcon';

const FooterContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  margin: '0 auto',
  height: 120,
  backgroundColor: theme.footerBgColor,
  width: '100%',
  flexShrink: 0,
  padding: '55px 0 24px'
}));

const FooterText = styled(Text)(({ theme }) => ({
  color: theme.footerTextColor,
  fontSize: 12,
  lineHeight: '18px',
  fontWeight: 400
}));

const SamsungLogoContainer = styled(SvgIcon)({
  width: 160,
  height: 20,
  cursor: 'pointer'
});

const Footer = () => {
  return (
    <FooterContainer>
      <SamsungLogoContainer symbol={ImgFooterLogo} onClick={() => window.location.replace('')} />
      <FooterText>Admin Portal. Copyright © Samsung Electronics Co., Ltd. All Rights Reserved.</FooterText>
    </FooterContainer>
  );
};

export default Footer;
