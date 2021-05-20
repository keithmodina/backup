import React, {
  useState,
  Fragment,
  useEffect
} from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import Card from '../components/Card';
import RadioButton from '../components/RadioButton';
import SelectBox from '../components/OptionSelectBox';
import isEmpty from '../../utils/isEmpty';
import { actionUpdateGppDetails } from '../../reduxModules/appGpp';
import Toast from '../components/Toast';
import Modal from '../components/Modal';
import { actionNavigateTo } from '../../reduxModules/common/routes';
import { ROUTE_HOME } from '../../constants/routes';

const GobackLink = styled('a')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer'
}));

const ErrorMessage = styled('div')(({ theme }) => ({
  fontFamily: 'SamsungOne',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: 14,
  lineHeight: '18px',
  color: theme.errorTextColor
}));

const TitleWithButtonContainer = styled('div')({
  display: 'flex'
});

const Title = styled('div')(({ theme }) => ({
  fontFamily: 'SamsungOne',
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: 36,
  lineHeight: '44px',
  color: theme.primaryTextColor,
  width: 958,
  height: 44,
  margin: '0 40px 40px 00px'
}));

const ButtonContainer = styled('div')({
  width: 'auto',
  height: 40,
  position: 'absolute',
  right: 40,
  display: 'flex'
});

const SubmitButton = styled('button')(({ theme, isPrimary, isDisabled = false }) => ({
  fontFamily: 'SamsungOne',
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: 16,
  lineHeight: '24px',
  alignItems: 'center',
  textAlign: 'center',
  color: isPrimary ? theme.fillBtnHoverBgColor : theme.white,
  height: 40,
  width: isPrimary ? 122 : 84,
  borderRadius: 26,
  border: isPrimary ? `1px solid ${theme.fillBtnHoverBgColor}` : 0,
  backgroundColor: isPrimary ? theme.white : theme.primaryColor,
  marginRight: 20,
  position: 'relative',
  cursor: 'pointer',
  pointerEvents: isDisabled ? 'none' : 'auto',
  opacity: isDisabled ? 0.5 : 1
}));

const SelectBoxContainer = styled('div')({
  display: 'flex',
  marginTop: 14
});

const BackButton = styled('a')(({ theme, fontSize }) => ({
  fontSize,
  cursor: 'pointer',
  display: 'block',
  fontWeight: 600,
  color: theme.primaryColor
}));

const ModalTitle = styled('div')({
  fontFamily: 'SamsungOne',
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: 20,
  lineHeight: '24px',
  padding: 36
});

const ModalButtonContainer = styled('div')({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  padding: '0 36px 36px 36px'
});

const ModalButtonText = styled('div')(({ theme }) => ({
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: 16,
  lineHeight: '24px',
  width: 216,
  height: 24,
  textAlign: 'center',
  color: theme.primaryColor,
  cursor: 'pointer'
}));

const ModalDesc = styled('div')({
  padding: '0 36px 27px 36px'
});

const UpdateGppDetails = ({
  gppDetails,
  isUpdating,
  isFetchingDetails,
  isFetchingError,
  countryList,
  languageList,
  actionUpdateGppDetails,
  actionNavigateTo,
  id,
  prevLocation
}) => {
  const { gppCode, country, language } = gppDetails;
  const CODE = !isEmpty(gppCode) && gppCode.split('-');
  const [countryCodeValue, setCountryCodeValue] = useState({
    code: CODE[1]
  });
  const [languageCodeValue, setLanguageCodeValue] = useState({
    code: CODE[0]
  });
  const [countryData, setCountryData] = useState(countryList);
  const [languageData, setLanguageData] = useState(languageList);
  const [isDisplayClientSite, setIsDisplayClientSite] = useState(false);
  const [isDisplayHistory, setIsDisplayHistory] = useState(false);
  const [isOpenCountryCode, setIsOpenCountryCode] = useState(false);
  const [isOpenLanguageCode, setIsOpenLanguageCode] = useState(false);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const prevClient = gppDetails.isDisplayClientSite;
  const prevHistory = gppDetails.isDisplayHistory;

  const handleCheckLoc = () => setIsDisplayClientSite(!isDisplayClientSite);
  const handleCheckVersion = () => setIsDisplayHistory(!isDisplayHistory);

  const handleSelectBoxCountryClick = e => {
    setCountryCodeValue({
      code: e.target.innerText,
      id: e.target.attributes[0].value
    });
  };

  const handleSelectBoxLanguageClick = e => {
    setLanguageCodeValue({
      code: e.target.innerText,
      id: e.target.attributes[0].value
    });
  };

  const handleSearch = (val, data) => {
    const checkIfHasValue = item => {
      if (!isEmpty(item.countryCode)) {
        return item.countryCode.toLowerCase().startsWith(val.toLowerCase());
      }
      return item.languageCode.toLowerCase().startsWith(val.toLowerCase());
    };
    return Object.values(data).filter(checkIfHasValue);
  };

  const handleCountryChange = e => {
    setCountryCodeValue(e.target.value);
    setCountryData(handleSearch(e.target.value, countryList));
    setIsOpenCountryCode(true);
  };

  const handleLanguageChange = e => {
    setLanguageCodeValue(e.target.value);
    setLanguageData(handleSearch(e.target.value, languageList));
    setIsOpenLanguageCode(true);
  };

  const handlePublish = () => {
    const dataToUpdate = {
      isDisplayClientSite,
      isDisplayHistory
    };
    actionUpdateGppDetails(id, dataToUpdate, prevLocation.type);
  };

  const handleOnAbort = () => {
    if (!prevClient === isDisplayClientSite || !prevHistory === isDisplayHistory) {
      setIsPopUpOpen(!isPopUpOpen);
    } else {
      if (prevLocation.type) return actionNavigateTo(prevLocation.type, { id: prevLocation.payload.id });
      return actionNavigateTo(ROUTE_HOME);
    }
  };

  useEffect(() => {
    setIsDisplayClientSite(gppDetails.isDisplayClientSite);
    setIsDisplayHistory(gppDetails.isDisplayHistory);
    setCountryCodeValue({
      code: CODE[1]
    });
    setLanguageCodeValue({
      code: CODE[0]
    });
  }, [gppDetails]);

  useEffect(() => {
    setLanguageData(languageList);
    setCountryData(countryList);
  }, [isOpenCountryCode, isOpenLanguageCode]);

  useEffect(() => {
    if (!prevClient === isDisplayClientSite || !prevHistory === isDisplayHistory) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [isDisplayClientSite, isDisplayHistory]);

  return isFetchingDetails
    ? 'Loading Details....'
    : (
      <Fragment>
      <GobackLink>
        <BackButton onClick={handleOnAbort}>{'< Go back to Manage Location/Language'}</BackButton>
      </GobackLink>
        <TitleWithButtonContainer>
          <Title>
            {country
            && language
            && `Update ${country.countryName}/${language.languageName}`}
          </Title>
          <ButtonContainer>
            <SubmitButton onClick={handleOnAbort} isPrimary>Cancel</SubmitButton>
            <SubmitButton onClick={handlePublish} isDisabled={isDisabled}>Submit</SubmitButton>
          </ButtonContainer>
        </TitleWithButtonContainer>
        <Card isForm>
          { isFetchingError && <ErrorMessage>Combination of country code and language code already exists</ErrorMessage>}
          <SelectBoxContainer>
            <SelectBox
              setIsOpenBox={setIsOpenCountryCode}
              isOpenBox={isOpenCountryCode}
              HandleSelectBoxClick={handleSelectBoxCountryClick}
              value={countryCodeValue.code}
              onChange={handleCountryChange}
              inputLabel='Country code *'
              data={countryData}
              isFetchingError={isFetchingError}
              disabled
            />
            <SelectBox
              setIsOpenBox={setIsOpenLanguageCode}
              isOpenBox={isOpenLanguageCode}
              HandleSelectBoxClick={handleSelectBoxLanguageClick}
              onChange={handleLanguageChange}
              value={languageCodeValue.code}
              inputLabel='Language code *'
              data={languageData}
              isFetchingError={isFetchingError}
              disabled
            />
          </SelectBoxContainer>
          <RadioButton
            containerStyle={{ marginBottom: 20 }}
            checked={isDisplayClientSite}
            fieldName='Language'
            position="relative"
            disabled={false}
            onClick={handleCheckLoc}
            textLabel="Display location/language on client site"
          />
          <RadioButton
            checked={isDisplayHistory}
            fieldName='Version'
            position="relative"
            disabled={false}
            onClick={handleCheckVersion}
            textLabel="Display version history on client site"
          />
        </Card>
        { isUpdating && (
          <Toast>
            {
            country && language
              ? `Submitting updates on ${country.countryName}/${language.languageName}...`
              : '' }
          </Toast>
        )}
        <Modal isOpen={isPopUpOpen} contentStyle={{ width: 504 }}>
          <ModalTitle>Discard changes</ModalTitle>
          <ModalDesc>Are you sure you want to cancel? You will lose recent changes.</ModalDesc>
          <ModalButtonContainer>
            <ModalButtonText onClick={handleOnAbort}>Cancel</ModalButtonText>
            <ModalButtonText onClick={() => actionNavigateTo(ROUTE_HOME)}>Discard</ModalButtonText>
          </ModalButtonContainer>
        </Modal>
      </Fragment>
    );
};

export default connect(state => ({
  gppDetails: state.gpp.gppDetails,
  isUpdating: state.gpp.isUpdating,
  isFetchingDetails: state.gpp.isFetchingDetails,
  isFetchingError: state.gpp.isFetchingError,
  id: state.location.payload.id,
  countryList: state.gpp.countryList,
  languageList: state.gpp.languageList,
  prevLocation: state.location.prev
}), {
  actionUpdateGppDetails,
  actionNavigateTo
})(UpdateGppDetails);
