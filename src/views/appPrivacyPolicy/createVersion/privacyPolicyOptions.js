import React, { useState, useEffect, Fragment } from 'react';
import styled from '@emotion/styled';
import { connect } from 'react-redux';

import isEmpty from '../../../utils/isEmpty';
import trim from '../../../utils/trim';

import { REMOVE_BUTTON } from '../../../constants/zIndex';

import Ellipsis from '../../../assets/icons/common/ic_more.svg';
import LoadPrevious from '../../../assets/icons/common/ic_load_previous.svg';
import Add from '../../../assets/icons/common/ic_add.svg';
import Remove from '../../../assets/icons/common/ic_remove.svg';
import LoadDraft from '../../../assets/icons/common/ic_load_draft.svg';

import SvgIcon from '../../components/SvgIcon';
import InputWithLabel from '../../components/InputWithLabel';
import FlatButton from '../../components/FlatButton';
import Spacer from '../../components/Spacer';
import Text from '../../components/Text';

import { actionGetGppDetails } from '../../../reduxModules/appPrivacyPolicy';
import { actionCloseConfirmationDialog, actionOpenConfirmationDialog } from '../../../reduxModules/common/dialog';

const OptionsContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  width: 'auto',
  height: 'auto'
}));

const FieldContainer = styled('div')(({ theme }) => ({
  width: 'auto',
  height: 'auto',
  display: 'flex',
  flexDirection: 'row',
  marginBottom: 20,
  alignItems: 'center'
}));

const SubOptBtnContainer = styled('div')(({ theme }) => ({
  width: 'auto',
  height: 24,
  display: 'flex',
  flexDirection: 'row-reverse',
  marginTop: 20
}));

const OptionField = styled(InputWithLabel)(({ theme }) => ({
  width: 'auto',
  height: 50,
  display: 'flex'
}));

const SubOptionsText = styled(Text)(({ theme, isHidden = false }) => ({
  display: isHidden ? 'none' : 'flex',
  marginBottom: 20,
  fontWeight: 700
}));

const CardBottom = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  marginTop: 32
}));

const CardTop = styled('div')(({ theme, shouldShow = true }) => ({
  width: '100%',
  height: 'auto',
  display: 'flex',
  paddingBottom: 36,
  flexDirection: 'column',
  justifyContent: 'center',
  borderBottom: `1px solid ${theme.detailsDividerColor}`
}));

const DetailsBtnContainer = styled('div')(({ theme, hasDraft = true }) => ({
  alignSelf: 'flex-end',
  width: 'auto',
  height: 'auto',
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: 10
}));

const DetailsContainer = styled('div')(({ theme, hasDraft = true }) => ({
  alignSelf: 'flex-end',
  width: 'auto',
  height: 'auto',
  display: 'flex',
  justifyContent: 'flex-end',
  flexDirection: 'column'
}));

const ButtonComponent = styled(FlatButton)(({ theme, isActive }) => ({
  lineHeight: '24px',
  fontSize: 16,
  fontWeight: 700,
  display: !isActive && 'none'
}));

const DropdownBtnComponent = ({
  removeFn,
  index,
  subIndex,
  optionDataLength
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const Container = styled('div')(({ theme }) => ({
    width: 100,
    height: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }));

  const RemoveButton = styled(FlatButton)(({ theme, show }) => ({
    lineHeight: '24px',
    fontSize: '16px',
    color: 'red',
    width: '120px',
    height: '54px',
    position: 'absolute',
    right: 60,
    marginTop: 60,
    borderRadius: 26,
    padding: 15,
    border: `1px solid ${theme.inputBorderColor}`,
    zIndex: REMOVE_BUTTON,
    transition: 'visibility .5s linear .5s',
    visibility: show ? 'visible' : 'hidden',
    background: 'white'
  }));
  return (optionDataLength > 1 || subIndex >= 0) ? (
    <Fragment>
      <Container onMouseLeave={() => setShowOptions(false)}>
        <FlatButton lineHeight={24} fontSize={16} onClick={() => setShowOptions(true)}>
          <SvgIcon symbol={Ellipsis} height={16} width={4} />
        </FlatButton>
        <RemoveButton show={showOptions} onMouseLeave={() => setShowOptions(false)} onClick={() => removeFn(index, subIndex)}>
          <SvgIcon symbol={Remove} height={22} width={17} />
          <Spacer spacing={10} />
          Remove
        </RemoveButton>
      </Container>
    </Fragment>
  ) : '';
};

const SubOptions = (subOption, optionIdx, subOptionIdx, isError, removeFn, hasOptionValue) => {
  return (
    <Fragment key={subOption._id + optionIdx}>
      <FieldContainer>
        <OptionField
          autoFocus={!isError || !isEmpty(subOption._id)}
          id={subOption._id}
          placeholder={!subOption.hasDuplicate ? 'ID*' : 'ID duplicate entry *'}
          minWidth={200}
          height={60}
          value={subOption._id}
          onChange={text => {
            subOption._id = trim(text);
            hasOptionValue();
          }}
          hasError={subOption.hasDuplicate || subOption.isIdEmpty}
          required
        />
        <Spacer spacing={20} />
        <OptionField
          placeholder='Title *'
          width="100%"
          minWidth={744}
          height={60}
          value={subOption.name}
          onChange={text => {
            subOption.name = trim(text);
            hasOptionValue();
          }}
          hasError={subOption.isNameEmpty}
          required
        />
        <DropdownBtnComponent removeFn={removeFn} index={optionIdx} subIndex={subOptionIdx} />
      </FieldContainer>
    </Fragment>
  );
};

const Options = (option, optionIdx, optionDataLength, isError, addSubOpt, removeFn, hasOptionValue) => {
  const OptionContainer = styled('div')(({ theme }) => ({
    position: 'relative',
    width: 'auto',
    height: 'auto',
    borderBottom: `1px solid ${theme.detailsDividerColor}`,
    padding: '29px 0px',
    alignItems: 'center'
  }));

  return (
    <Fragment key={option._id + optionIdx}>
      <OptionContainer>
        <FieldContainer>
          <OptionField
            autoFocus={!isError || !isEmpty(option._id)}
            id={option._id}
            placeholder={!option.hasDuplicate ? 'ID*' : 'ID duplicate entry *'}
            minWidth={200}
            height={60}
            value={option._id}
            onChange={text => {
              option._id = trim(text);
              hasOptionValue();
            }}
            hasError={option.hasDuplicate || option.isIdEmpty}
            required
          />
          <Spacer spacing={20} />
          <OptionField
            placeholder='Title *'
            width="100%"
            minWidth={744}
            height={60}
            value={option.name}
            hasError={option.isNameEmpty}
            onChange={
              text => {
                option.name = trim(text);
                option.header = trim(text);
                hasOptionValue();
              }
            }
            required
          />
          <DropdownBtnComponent removeFn={removeFn} index={optionIdx} optionDataLength={optionDataLength} />
        </FieldContainer>
        <SubOptionsText>Suboptions</SubOptionsText>
        {option.options && option.options.map((data, subOptIdx) => SubOptions(data, optionIdx, subOptIdx, isError, removeFn, hasOptionValue))}
        <SubOptBtnContainer>
          <FlatButton fontWeight={700} lineHeight={24} fontSize={16} onClick={() => addSubOpt(optionIdx)}>
            <SvgIcon symbol={Add} height={22} width={17} />
            <Spacer spacing={10} />
              Add suboption
          </FlatButton>
        </SubOptBtnContainer>
      </OptionContainer>
    </Fragment>
  );
};

const PrivacyPolicyOptions = ({
  isError,
  gppDetails,
  optionData,
  actionOpenConfirmationDialog,
  actionCloseConfirmationDialog,
  actionGetGppDetails,
  hasOptionValue,
  handleOptions
}) => {
  const handleLoadPrevious = async () => {
    actionOpenConfirmationDialog({
      title: 'Load from previous version',
      width: 504,
      content: 'Are you sure you want to load the same options from previous version? Doing so will discard your current work.',
      affirmText: 'Load',
      declineText: 'Cancel',
      onAffirm: async () => {
        if (!isEmpty(gppDetails) && gppDetails.ppOptions.length) {
          await actionGetGppDetails(gppDetails.id);
          handleOptions(gppDetails.ppOptions);
          hasOptionValue(true);
          actionCloseConfirmationDialog();
        }
      }
    });
  };

  const addOption = index => {
    const newOption = {
      _id: '', name: ''
    };

    if (index !== -1) {
      if (!optionData[index].options) {
        optionData[index].options = [];
      } optionData[index].options.push(newOption);
    } else {
      newOption.header = '';
      newOption.options = [];
      optionData.push(newOption);
    }
    handleOptions([...optionData]);
  };

  const removeOption = (index, subIndex) => {
    if (subIndex >= 0) {
      optionData[index].options.splice(subIndex, 1);
    } else {
      optionData.splice(index, 1);
    }

    handleOptions([...optionData]);
  };

  return (
    <Fragment>
      <CardTop>
        <DetailsContainer>
          {/* <DetailsText>Draft last updated 10:00 AM July 20, 2020 by j.limos</DetailsText> */}
          <DetailsBtnContainer>
            <FlatButton lineHeight={24} fontSize={16} fontWeight={700}>
              <SvgIcon symbol={LoadDraft} height={20} width={20} />
              <Spacer spacing={10} />
              Load draft
            </FlatButton>
            <ButtonComponent onClick={() => handleLoadPrevious()} isActive={gppDetails.ppOptions && gppDetails.ppOptions.length > 0}>
              <SvgIcon symbol={LoadPrevious} height={22} width={17} />
              <Spacer spacing={10} />
              Load from previous version
            </ButtonComponent>
          </DetailsBtnContainer>
        </DetailsContainer>
      </CardTop>
      <OptionsContainer>
        {optionData.map((data, index) => Options(data, index, optionData.length, isError, addOption, removeOption, hasOptionValue))}
      </OptionsContainer>
      <CardBottom>
        <FlatButton fontWeight={700} lineHeight={24} fontSize={16} onClick={() => addOption(-1)}>
          <SvgIcon symbol={Add} height={22} width={17} />
          <Spacer spacing={10} />
          Add another option
        </FlatButton>
      </CardBottom>
    </Fragment>
  );
};

export default connect(state => ({
  gppDetails: state.privacypolicy.gppDetails
}), {
  actionOpenConfirmationDialog,
  actionCloseConfirmationDialog,
  actionGetGppDetails
})(PrivacyPolicyOptions);
