import React from 'react';
import styled from '@emotion/styled';

const FlatButton = styled('button')(({ theme }) => ({
  color: theme.linkTextColor,
  cursor: 'pointer',
  fontSize: 16,
  fontWeight: 'bold',
  backgroundColor: theme.white,
  border: 0
}));

const LinkText = ({ children, onClick, className }) => {
  return (
    <FlatButton className={className} onClick={onClick}>{children}</FlatButton>
  );
};

export default LinkText;
