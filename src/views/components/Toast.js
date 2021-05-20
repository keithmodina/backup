import styled from '@emotion/styled';

const Toast = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '15px 40px',
  position: 'fixed',
  textAlign: 'justify',
  bottom: 33,
  left: 0,
  right: 0,
  margin: 'auto',
  width: 'max-content',
  height: 48,
  background: theme.toastBgColor,
  fontFamily: 'SamsungOne',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: 14,
  lineHeight: '18px',
  color: theme.white,
  borderRadius: 26
}));

export default Toast;
