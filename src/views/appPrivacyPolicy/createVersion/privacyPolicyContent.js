import React, { Fragment, useRef } from 'react';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import JoditEditor from 'jodit-react';

import config from '../../../constants/editorConfig';

import SvgIcon from '../../components/SvgIcon';
import Calendar from '../../components/DatePicker';
import UploadHtmlFile from '../../components/uploadHtmlFile';

const DateBox = styled('div')(({ theme, isError, hasVersion }) => ({
  display: !hasVersion ? 'inline-flex' : 'block',
  alignItems: 'center',
  width: 494,
  height: 60,
  borderRadius: 26,
  border: `1px solid  ${!isError ? theme.cardBorderGppColor : theme.inputBorderColorError}`,
  boxSizing: 'border-box',
  marginBottom: 20,
  padding: '10px 27px 10px 18px',
  '& .not_empty': {
    transform: 'translate(0, 0) scale(0.87)'
  },
  '& .container_not_empty': {
    marginTop: 19
  }
}));

const DateText = styled('span')(({ theme, isError }) => ({
  color: !isError ? theme.footerTextColor : theme.errorTextColor,
  position: 'absolute',
  transform: 'translate(0,0) scale(1)',
  transformOrigin: 'top left',
  transition: 'all 0.2s ease-out'
}));

const DateAndIconContainer = styled('div')(({ theme }) => ({
  width: '100%',
  fontFamily: 'SamsungOne',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: 14,
  display: 'flex',
  lineHeight: '18px',
  color: theme.footerTextColor
}));

const DateBoxAndUploadFile = styled('div')({
  display: 'flex'
});

const EditorContainer = styled('div')(({ theme, isError }) => ({
  width: '100%',
  margin: 'auto',
  borderRadius: 26,
  '& .jodit-container': {
    border: isError && `1px solid  ${!isError ? theme.cardBorderGppColor : theme.inputBorderColorError} !important`
  }
}));

const UploadFile = styled('div')(({ theme }) => ({
  fontFamily: 'SamsungOne',
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: 16,
  lineHeight: '24px',
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
  color: theme.fillBtnHoverBgColor,
  position: 'absolute',
  right: 36,
  top: 72,
  cursor: 'pointer'
}));

const Icon = styled(SvgIcon)(({
  width,
  height,
  marginTop = 0,
  marginRight = 0
}) => ({
  width,
  height,
  marginTop,
  marginRight,
  cursor: 'pointer'
}));

const PrivacyPolicyContent = ({
  details,
  setDetails,
  version,
  isDateError,
  isContentError,
  isDuplicate,
  handleCalendarDateChange,
  handleCalendarOk,
  handleCalendarCancel,
  onChangeContent
}) => {
  const editor = useRef(null);

  return (
    <Fragment>
      <DateBoxAndUploadFile>
        <DateBox isError={isDateError} hasVersion={!!version}>
          <DateText isError={isDateError} className={version ? 'not_empty' : ''}>
            {
              !isDateError || (isDateError && !isDuplicate)
                ? 'Version *'
                : 'Version date already taken by a published version or draft *'
            }
          </DateText>
          <DateAndIconContainer className={version ? 'container_not_empty' : ''}>
            <Calendar
              date={version}
              selectedDay={details.version}
              onDateChanged={handleCalendarDateChange}
              onClickOk={handleCalendarOk}
              onClickCancel={handleCalendarCancel}
            />
          </DateAndIconContainer>
        </DateBox>
       <UploadHtmlFile setDetails={setDetails} details={details} />
      </DateBoxAndUploadFile>
      <EditorContainer isError={isContentError}>
        <JoditEditor
          ref={editor}
          value={details.content}
          config={config}
          onChange={onChangeContent}
        />
      </EditorContainer>
    </Fragment>
  );
};

export default connect(state => ({
  isCreatePrivacyPolicyError: state.privacypolicy.isCreatePrivacyPolicyError
}), {})(PrivacyPolicyContent);
