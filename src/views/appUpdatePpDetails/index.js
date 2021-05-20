import React, {
  useState,
  Fragment,
  useEffect,
  useRef
} from 'react';
import cookie from 'js-cookie';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import JoditEditor from 'jodit-react';
import { format } from 'date-fns';
import trim from '../../utils/trim';
import Spacer from '../components/Spacer';
import FlatButton from '../components/FlatButton';
import isEmpty from '../../utils/isEmpty';
import InputWithLabel from '../components/InputWithLabel';
import Ellipsis from '../../assets/icons/common/ic_more.svg';
import Add from '../../assets/icons/common/ic_add.svg';
import Remove from '../../assets/icons/common/ic_remove.svg';
import SvgIcon from '../components/SvgIcon';
import config from '../../constants/editorConfig';
import { isContentEmpty } from '../../utils/contentValidation';
import { convertDateTimeToVersionFormat } from '../../utils/dateConverter';
import UploadHtmlFile from '../components/uploadHtmlFile';

import Toast from '../components/Toast';
import Calendar from '../components/DatePicker';
import TitleAndButtonsContainer from '../layouts/TitleAndButtonsContainer';
import Text from '../components/Text';
import { USERNAME } from '../../constants/storage';
import { actionUpdatePpDetails, actionGetGppVersion } from '../../reduxModules/appPrivacyPolicy';
import { REMOVE_BUTTON, TAB_ACTIVE, TAB_INACTIVE } from '../../constants/zIndex';

const CardContainer = styled('div')(({ theme }) => ({
  background: theme.white,
  border: `1px solid ${theme.cardBorderGppColor}`,
  boxSizing: 'border-box',
  borderRadius: 36,
  borderBottom: 'none',
  borderTopLeftRadius: 0,
  padding: '36px 36px 27px',
  height: 'auto',
  position: 'relative'
}));

const SelectedTab = styled('div')(({ theme, isActive }) => ({
  display: isActive ? 'inline-flex' : 'none',
  minHeight: '232px',
  flexDirection: 'column',
  width: '100%'
}));

const TabButtonsContainer = styled('div')(({ theme }) => ({
  height: 40,
  display: 'inline-flex',
  position: 'absolute',
  top: -39
}));

const TabButton = styled('button')(({ theme, isActive, hasError }) => ({
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

const TabContainer = styled('div')(({ theme }) => ({
  boxSizing: 'border-box',
  height: 'auto',
  width: 'auto',
  position: 'relative',
  marginTop: 40
}));

const FieldContainer = styled('div')(({ theme }) => ({
  width: 'auto',
  height: 'auto',
  display: 'flex',
  flexDirection: 'row',
  marginBottom: 20,
  alignItems: 'center'
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

const SubOptBtnContainer = styled('div')(({ theme }) => ({
  width: 'auto',
  height: 24,
  display: 'flex',
  flexDirection: 'row-reverse',
  marginTop: 20
}));

const CardBottom = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  marginTop: 32
}));

const OptionsContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  width: 'auto',
  height: 'auto'
}));

const DateBox = styled('div')(({ theme, isError }) => ({
  width: 494,
  height: 60,
  borderRadius: 26,
  border: `1px solid  ${!isError ? theme.cardBorderGppColor : theme.inputBorderColorError}`,
  boxSizing: 'border-box',
  marginBottom: 20,
  padding: '10px 27px 10px 18px'
}));

const DateAndIconContainer = styled('div')(({ theme }) => ({
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
  overflow: 'hidden',
  '& .jodit-container': {
    border: `1px solid  ${isError ? theme.inputBorderColorError : theme.cardBorderGppColor} !important`
  }
}));

const DateText = styled('span')(({ theme, isError }) => ({
  color: !isError ? theme.footerTextColor : theme.errorTextColor
}));

const BottomBorder = styled('div')({
  height: 26,
  border: '1px solid #D6D6D6',
  width: 'calc(100vw - 360px)',
  position: 'fixed',
  bottom: 0,
  left: 320,
  borderTop: 'none',
  backgroundColor: '#fff',
  borderBottomRightRadius: 26,
  borderBottomLeftRadius: 26
});

const SubOptions = (subOption, optionIdx, subOptionIdx, removeFn) => {
  return (
    <Fragment>
      <FieldContainer>
        <OptionField
          id={subOption._id}
          placeholder={!subOption.hasDuplicate ? 'ID*' : 'ID duplicate entry *'}
          minWidth={200}
          height={60}
          value={subOption._id}
          onChange={text => { subOption._id = trim(text); }}
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
          onChange={text => { subOption.name = trim(text); }}
          hasError={subOption.isNameEmpty}
          required
        />
        <DropdownBtnComponent removeFn={removeFn} index={optionIdx} subIndex={subOptionIdx} />
      </FieldContainer>
    </Fragment>
  );
};

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

const Options = (option, optionIdx, addSubOpt, removeFn, optionDataLength) => {
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
            id={option._id}
            placeholder={!option.hasDuplicate ? 'ID*' : 'ID duplicate entry *'}
            minWidth={200}
            height={60}
            value={option._id}
            onChange={text => { option._id = trim(text); }}
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
              }
            }
            required
          />
          <DropdownBtnComponent removeFn={removeFn} index={optionIdx} optionDataLength={optionDataLength} />
        </FieldContainer>
        <SubOptionsText>Suboptions</SubOptionsText>
        {option.options && option.options.map((data, subOptIdx) => SubOptions(data, optionIdx, subOptIdx, removeFn))}
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

const UpdatePpDetails = ({
  id,
  actionUpdatePpDetails,
  privacyDetails,
  isUpdatePpDetailsPending,
  isUpdatePpDetailsError,
  isFetchingPrivacyPolicy,
  actionGetGppVersion
}) => {
  const {
    gpp,
    content,
    version,
    options,
    countryName,
    language
  } = privacyDetails;
  const editor = useRef(null);
  const initialOptions = [{
    ...options
  }];
  const [newContent, setNewContent] = useState(String(''));
  const [optionData, setOptionData] = useState(initialOptions);
  const [currVersion, setCurrVersion] = useState();
  const [isDateError, setIsDateError] = useState(isUpdatePpDetailsError);
  const [activeTab, setActiveTab] = useState('content');
  const [optionsError, setOptionsError] = useState(false);
  const [isError, setPageError] = useState({
    version: false,
    content: false
  });
  const [details, setDetails] = useState({
    content: String(content),
    version,
    options
  });

  const dateFormat = date => format(new Date(date), 'MMMM dd, yyyy');

  useEffect(() => {
    setDetails({
      ...details,
      version: !isEmpty(privacyDetails) && dateFormat(privacyDetails.version),
      content
    });
    setOptionData(!isEmpty(privacyDetails) && privacyDetails.options);
    setCurrVersion(!isEmpty(privacyDetails) && dateFormat(privacyDetails.version));
  }, [privacyDetails]);

  const handleDateChange = date => {
    setDetails({
      ...details,
      version: date
    });
  };

  const hadleOnOk = date => {
    if (!isEmpty(date)) setCurrVersion(dateFormat(date));
  };

  const handleOnCancel = () => {
    setDetails({
      ...details,
      version: !isEmpty(privacyDetails) && dateFormat(currVersion)
    });
  };

  const addOption = index => {
    const newOption = {
      _id: '', name: ''
    };

    if (index !== -1) {
      optionData[index].options.push(newOption);
    } else {
      newOption.header = '';
      newOption.options = [];
      optionData.push(newOption);
    }
    setOptionData([...optionData]);
  };

  const removeOption = (index, subIndex) => {
    if (subIndex >= 0) {
      optionData[index].options.splice(subIndex, 1);
    } else {
      optionData.splice(index, 1);
    }

    setOptionData([...optionData]);
  };

  const getOptionsErrors = () => {
    const data = optionData;
    const valuesArray = [];
    let optionsHasError = false;

    data.forEach((option, optionIdx) => {
      option.index = optionIdx;
      option.hasDuplicate = false;
      option.isNameEmpty = option.name === '';
      option.isIdEmpty = option._id === '';
      optionsHasError = optionsHasError || (option.isNameEmpty || option.isIdEmpty);
      valuesArray.push(option);
      option.options.forEach((subOption, subOptIdx) => {
        subOption.index = optionIdx;
        subOption.subIndex = subOptIdx;
        subOption.hasDuplicate = false;
        subOption.isIdEmpty = subOption._id === '';
        subOption.isNameEmpty = subOption.name === '';
        optionsHasError = optionsHasError || (subOption.isNameEmpty || subOption.isIdEmpty);
        valuesArray.push(subOption);
      });
    });

    const lookup = valuesArray.reduce((arr, element) => {
      arr[element._id] = ++arr[element._id !== '' && element._id] || 0;
      return arr;
    }, {});

    const dups = valuesArray.filter(e => lookup[e._id]);

    dups.forEach(element => {
      if (element.subIndex === undefined) {
        optionData[element.index].hasDuplicate = true;
      } else {
        optionData[element.index].options[element.subIndex].hasDuplicate = true;
      }
    });

    setOptionsError(dups.length || optionsHasError);
    if (dups.length || optionsHasError) {
      // marks options as error
      setOptionData([...optionData]);
      setActiveTab(!isDateError ? 'options' : 'content');
      return true;
    }
    return false;
  };

  const cleanupOptionData = () => {
    // removes hasError flag before persist
    const data = optionData;
    data.forEach(option => {
      delete option.index;
      delete option.isNameEmpty;
      delete option.isIdEmpty;
      delete option.hasDuplicate;
      option.options.forEach(subOption => {
        delete subOption.hasDuplicate;
        delete subOption.isNameEmpty;
        delete subOption.isIdEmpty;
        delete subOption.index;
        delete subOption.subIndex;
      });
    });

    setOptionData([...data]);
  };

  const handleContentChange = val => {
    if (val) setPageError({ ...isError, content: false });
    setNewContent(val);
  };

  const updatePpDetailsOnPublish = async () => {
    const user = cookie.get(USERNAME) || '';
    const hasOptionsErrors = getOptionsErrors();
    const isValid = await isValuesValid();

    if (!hasOptionsErrors && isValid) {
      cleanupOptionData();
      actionUpdatePpDetails({
        ...details,
        content: newContent,
        updatedBy: user,
        options: optionData
      }, id);
    }
  };

  const isValuesValid = async () => {
    const selectedVersion = await actionGetGppVersion({
      gpp, version: convertDateTimeToVersionFormat(details.version)
    });
    const isVersionValid = isEmpty(selectedVersion.data)
      || dateFormat(version) === dateFormat(currVersion);
    const isContentValid = !isContentEmpty(newContent);

    setPageError({
      ...isError,
      version: !isVersionValid,
      content: !isContentValid
    });

    return isContentValid && isVersionValid;
  };

  return isFetchingPrivacyPolicy ? 'Loading Details....' : (
    <Fragment>
      <TitleAndButtonsContainer
        title={`Update ${!isEmpty(privacyDetails) && currVersion} version`}
        countryName={countryName}
        languageName={language}
        newContent={newContent}
        version={details.version}
        handleOnclick={updatePpDetailsOnPublish}
      />
      <TabContainer>
        <TabButtonsContainer>
          <TabButton onClick={() => setActiveTab('content')} isActive={activeTab === 'content'}>Content</TabButton>
          <TabButton onClick={() => setActiveTab('options')} isActive={activeTab === 'options'} hasError={optionsError}>Options</TabButton>
        </TabButtonsContainer>
        <CardContainer>
          <SelectedTab isActive={activeTab === 'content'}>
            <DateBoxAndUploadFile>
              <DateBox isError={isDateError}>
                <DateText isError={isDateError}>
                  {
                    !isDateError
                      ? 'Date *'
                      : 'Date already taken by version or draft *'
                  }
                </DateText>
                <DateAndIconContainer>
                  <Calendar
                    date={details.version}
                    selectedDay={currVersion}
                    onDateChanged={handleDateChange}
                    onClickOk={hadleOnOk}
                    onClickCancel={handleOnCancel}
                  />
                </DateAndIconContainer>
              </DateBox>
              <UploadHtmlFile setDetails={setDetails} details={details} />
            </DateBoxAndUploadFile>
            <EditorContainer isError={isError.content}>
              <JoditEditor
                editorRef={editor}
                value={details.content}
                config={config}
                onChange={handleContentChange}
              />
              {/* <BottomBorder className="bottom-border" /> */}
            </EditorContainer>
          </SelectedTab>
          <SelectedTab isActive={activeTab === 'options'}>
            <OptionsContainer>
              {optionData && optionData.map((data, index) => Options(data, index, addOption, removeOption, optionData.length))}
            </OptionsContainer>
            <CardBottom>
              <FlatButton fontWeight={700} lineHeight={24} fontSize={16} onClick={() => addOption(-1)}>
                <SvgIcon symbol={Add} height={22} width={17} />
                <Spacer spacing={10} />
                Add another option
              </FlatButton>
            </CardBottom>
          </SelectedTab>
          {isUpdatePpDetailsPending && <Toast>{`Publishing updates on ${dateFormat(details.version)} version...`}</Toast>}
        </CardContainer>
      </TabContainer>
    </Fragment>
  );
};

export default connect(state => ({
  id: state.location.payload.id,
  privacyDetails: state.privacypolicy.privacyPolicyDetails,
  isUpdatePpDetailsPending: state.privacypolicy.isUpdatePpDetailsPending,
  isUpdatePpDetailsError: state.privacypolicy.isUpdatePpDetailsError,
  isFetchingPrivacyPolicy: state.privacypolicy.isFetchingPrivacyPolicy
}), {
  actionUpdatePpDetails,
  actionGetGppVersion
})(UpdatePpDetails);
