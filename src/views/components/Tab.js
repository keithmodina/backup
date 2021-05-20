import React, { Fragment, useState } from 'react';
import styled from '@emotion/styled';
import { Container } from './DatePicker/styles';
import { TAB_ACTIVE, TAB_INACTIVE } from '../../constants/zIndex';

const TabContainer = styled('div')(({ theme }) => ({
  boxSizing: 'border-box',
  height: 'auto',
  width: 'auto',
  position: 'relative',
  marginTop: 40
}));

const TabButtonsContainer = styled('div')(({ theme }) => ({
  height: 40,
  display: 'inline-flex',
  position: 'absolute',
  top: -39
}));

const TabButton = (activeTab, setActiveTab, tab, tabIdx) => {
  const TabButtonComp = styled('button')(({ theme, isActive, hasError }) => ({
    borderRadius: '26px 26px 0px 0px',
    width: 117,
    height: 40,
    padding: '8px 30px',
    border: `1px solid ${theme.inputBorderColor}`,
    borderBottom: 'hidden',
    boxSizing: 'border-box',
    background: isActive ? theme.white : theme.bodyColor,
    zIndex: isActive ? TAB_ACTIVE : TAB_INACTIVE,
    cursor: 'pointer',
    fontSize: 16,
    lineHeight: '24px',
    fontWeight: 700,
    color: hasError && theme.optionsButtonError
  }));

  return (
    <Fragment key={tab.id + tabIdx}>
      <Container>
        <TabButtonComp onClick={() => setActiveTab(tab.id)} isActive={activeTab === tab.id}>{tab.title}</TabButtonComp>
      </Container>
    </Fragment>
  );
};

const SelectedTab = (activeTab, tab, tabIdx) => {
  const SelectedTabComp = styled('div')(({ theme, isActive }) => ({
    display: isActive ? 'inline-flex' : 'none',
    minHeight: '232px',
    flexDirection: 'column',
    width: '100%'
  }));

  return (
    <Fragment key={tab.id + tabIdx}>
      <SelectedTabComp isActive={activeTab === tab.id}>{tab.component}</SelectedTabComp>
    </Fragment>
  );
};

const CardContainer = styled('div')(({ theme, isActive }) => ({
  background: theme.white,
  border: `1px solid ${theme.cardBorderGppColor}`,
  boxSizing: 'border-box',
  borderRadius: '0px 26px 26px',
  padding: '36px 36px 27px 36px',
  height: 'auto',
  position: 'relative'
}));

const Tab = ({ tabData }) => {
  const [activeTab, setActiveTab] = useState(tabData[0].id);
  return (
    <Fragment>
      <TabContainer>
        <TabButtonsContainer>
          {tabData.map((tab, index) => TabButton(activeTab, setActiveTab, tab, index))}
        </TabButtonsContainer>
        <CardContainer>
            {tabData.map((tab, index) => SelectedTab(activeTab, tab, index))}
        </CardContainer>
      </TabContainer>
    </Fragment>
  );
};

export default Tab;
