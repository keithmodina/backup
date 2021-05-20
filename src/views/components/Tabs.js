import React, { Fragment, useState } from 'react';
import styled from '@emotion/styled';
import { TAB_ACTIVE, TAB_INACTIVE } from '../../constants/zIndex';

const Container = styled('div')(({ theme }) => ({
  boxSizing: 'border-box',
  height: 'auto',
  width: 'auto',
  position: 'relative'
}));

const TabsContainer = styled('div')(({ theme }) => ({
  background: theme.white,
  border: `1px solid ${theme.cardBorderGppColor}`,
  boxSizing: 'border-box',
  borderRadius: '0px 26px 26px',
  padding: '36px 36px 27px 36px',
  height: 'auto'
}));

const Tab = styled('div')(({ isActive }) => ({
  display: isActive ? 'inline-flex' : 'none',
  minHeight: '232px',
  flexDirection: 'column',
  width: '100%'
}));

const ButtonsContainer = styled('div')({
  height: 40,
  display: 'inline-flex',
  position: 'relative',
  top: 1
});

const TabButton = styled('button')(({ theme, isActive, hasError }) => ({
  borderRadius: '26px 26px 0px 0px',
  width: 'auto',
  minWidth: 117,
  height: 40,
  padding: '8px 30px',
  border: `1px solid ${theme.inputBorderColor}`,
  borderBottom: 'hidden',
  boxSizing: 'border-box',
  background: isActive ? theme.white : 'transparent',
  zIndex: isActive ? TAB_ACTIVE : TAB_INACTIVE,
  cursor: 'pointer',
  fontSize: 16,
  lineHeight: '24px',
  fontWeight: 700,
  color: hasError && theme.optionsButtonError
}));

const TabButtonsContainer = ({
  tabs,
  activeTab,
  handleActiveTab
}) => {
  return (
    <Fragment>
      <ButtonsContainer>
        { tabs.map((tab, index) => {
          return (
            <TabButton
              key={index}
              onClick={() => handleActiveTab(tab.name)}
              isActive={activeTab === tab.name}
              hasError={tab.error}
            >
              {tab.title}
            </TabButton>
          );
        })}
      </ButtonsContainer>
    </Fragment>
  );
};

Tab.Container = Container;
Tab.TabsContainer = TabsContainer;
Tab.Buttons = TabButtonsContainer;

export default Tab;
