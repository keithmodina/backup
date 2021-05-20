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
import { actionCreateGppDetails, actionUpdateGppDetails } from '../../reduxModules/appGpp';
import Toast from '../components/Toast';
import Modal from '../components/Modal';
import { actionNavigateTo } from '../../reduxModules/common/routes';
import { ROUTE_HOME, ROUTE_PRIVACY_POLICY_VERSION_CREATE } from '../../constants/routes';

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

const SubmitButton = styled('button')(({ theme, isPrimary, isDisable }) => ({
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
  pointerEvents: isDisable ? 'none' : 'auto',
  opacity: isDisable ? 0.7 : 1
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

const CreateGppDetails = ({
  isCreatingError,
  isCreatingDetails,
  countryList,
  languageList,
  actionCreateGppDetails,
  actionNavigateTo,
  createdGppId,
  isCreatedDetails,
  actionUpdateGppDetails,
  prevLocation
}) => {
  const [countryCodeValue, setCountryCodeValue] = useState({});
  const [isEmptyCountryCode, setIsEmptyCountryCode] = useState(false);
  const [isEmptyLanguageCode, setIsEmptyLanguageCode] = useState(false);
  const [languageCodeValue, setLanguageCodeValue] = useState({});
  const [countryData, setCountryData] = useState(countryList);
  const [languageData, setLanguageData] = useState(languageList);
  const [isClientSite, setIsClientSite] = useState(false);
  const [isDisplayHistory, setIsDisplayHistory] = useState(false);
  const [isOpenCountryCode, setIsOpenCountryCode] = useState(false);
  const [isOpenLanguageCode, setIsOpenLanguageCode] = useState(false);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [isSubmitDisable, setIsSubmitDisable] = useState(true);

  const handleCheckLoc = () => setIsClientSite(!isClientSite);
  const handleCheckVersion = () => setIsDisplayHistory(!isDisplayHistory);

  useEffect(() => {
    setLanguageData(languageList);
    setCountryData(countryList);
  }, [isOpenCountryCode, isOpenLanguageCode]);

  const handleSelectBoxCountryClick = e => {
    setCountryCodeValue({
      code: e.target.innerText,
      name: e.target.dataset.codeName,
      region: e.target.dataset.region,
      id: e.target.attributes[0].value
    });
    setIsEmptyCountryCode(false);
  };

  const handleSelectBoxLanguageClick = e => {
    setLanguageCodeValue({
      code: e.target.innerText,
      name: e.target.dataset.codeName,
      id: e.target.attributes[0].value
    });
    setIsEmptyLanguageCode(false);
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
    setIsEmptyCountryCode(false);
  };

  const handleLanguageChange = e => {
    setLanguageCodeValue(e.target.value);
    setLanguageData(handleSearch(e.target.value, languageList));
    setIsOpenLanguageCode(true);
    setIsEmptyLanguageCode(false);
  };

  const handleOnClickCreate = () => {
    actionNavigateTo(ROUTE_PRIVACY_POLICY_VERSION_CREATE, { id: createdGppId });
  };

  const handleBackAction = () => {
    if (languageCodeValue.code || countryCodeValue.code) {
      return setIsPopUpOpen(!isPopUpOpen);
    }
    return actionNavigateTo(ROUTE_HOME);
  };

  const handleOnAbort = () => {
    setCountryCodeValue({});
    setLanguageCodeValue({});
    actionUpdateGppDetails(createdGppId, { isDisplayClientSite: false }, prevLocation);
  };

  const handlePublish = () => {
    const dataToCreate = {
      isDisplayClientSite: isClientSite,
      isDisplayHistory,
      gppCode: `${languageCodeValue.code}-${countryCodeValue.code}`,
      country: countryCodeValue.id,
      region: countryCodeValue.region,
      language: languageCodeValue.id,
      keywords: `${countryCodeValue.code} ${countryCodeValue.name} / ${languageCodeValue.name}`
    };
    if (!languageCodeValue.code) setIsEmptyLanguageCode(true);
    if (!countryCodeValue.code) setIsEmptyCountryCode(true);
    if (languageCodeValue.code && countryCodeValue.code) actionCreateGppDetails(dataToCreate);
  };

  useEffect(() => {
    if (languageCodeValue.code && countryCodeValue.code) setIsSubmitDisable(false);
  }, [languageCodeValue, countryCodeValue]);

  return (
    <Fragment>
      <GobackLink>
        <BackButton onClick={handleBackAction}>{'< Go back to Manage Location/Language'}</BackButton>
      </GobackLink>
      <TitleWithButtonContainer>
        <Title>
          Create new location/language
        </Title>
        <ButtonContainer>
          <SubmitButton onClick={handleBackAction} isPrimary>Cancel</SubmitButton>
          <SubmitButton isDisable={isSubmitDisable} onClick={handlePublish}>Submit</SubmitButton>
        </ButtonContainer>
      </TitleWithButtonContainer>
      <Card isForm>
        {isCreatingError && <ErrorMessage>Combination of country code and language code already exists</ErrorMessage>}
        <SelectBoxContainer>
          <SelectBox
            setIsOpenBox={setIsOpenCountryCode}
            isOpenBox={isOpenCountryCode}
            HandleSelectBoxClick={handleSelectBoxCountryClick}
            value={countryCodeValue.code}
            onChange={handleCountryChange}
            inputLabel='Country code *'
            data={countryData}
            isFetchingError={isCreatingError}
            isEmpty={isEmptyCountryCode}
          />
          <SelectBox
            setIsOpenBox={setIsOpenLanguageCode}
            isOpenBox={isOpenLanguageCode}
            HandleSelectBoxClick={handleSelectBoxLanguageClick}
            onChange={handleLanguageChange}
            value={languageCodeValue.code}
            inputLabel='Language code *'
            data={languageData}
            isFetchingError={isCreatingError}
            isEmpty={isEmptyLanguageCode}
          />
        </SelectBoxContainer>
        <RadioButton
          containerStyle={{ marginBottom: 20 }}
          checked={isClientSite}
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
      { isCreatingDetails && (
        <Toast>
          Submitting updates new language/location
        </Toast>
      )}
      <Modal isOpen={isPopUpOpen} contentStyle={{ width: 504 }}>
        <ModalTitle>Discard changes</ModalTitle>
        <ModalDesc>Are you sure you want to cancel? You will lose recent changes.</ModalDesc>
        <ModalButtonContainer>
          <ModalButtonText onClick={handleBackAction}>Cancel</ModalButtonText>
          <ModalButtonText onClick={handleOnAbort}>Discard</ModalButtonText>
        </ModalButtonContainer>
      </Modal>
      <Modal isOpen={isCreatedDetails} contentStyle={{ width: 504 }}>
        <ModalTitle>{`Successfully created ${countryCodeValue.name} / ${languageCodeValue.name}`}</ModalTitle>
        {
          !isClientSite
            ? <ModalDesc>Do you want to continue and create a new version for it?</ModalDesc>
            : (
              <ModalDesc>
                Do you want to continue and create a new version for it? Without a version, location/language will be changed to inactive and will not be displayed on the client site.
              </ModalDesc>
            )
        }
        <ModalButtonContainer>
          <ModalButtonText onClick={handleOnAbort}>Cancel</ModalButtonText>
          <ModalButtonText onClick={handleOnClickCreate}>Create</ModalButtonText>
        </ModalButtonContainer>
      </Modal>
    </Fragment>
  );
};

export default connect(state => ({
  id: state.location.payload.id,
  createdGppId: state.gpp.gppDetails._id,
  isCreatedDetails: state.gpp.isCreatedDetails,
  countryList: state.gpp.countryList,
  languageList: state.gpp.languageList,
  isCreatingError: state.gpp.isCreatingError,
  isCreatingDetails: state.gpp.isCreatingDetails,
  prevLocation: state.location.prev.type
}), {
  actionCreateGppDetails,
  actionNavigateTo,
  actionUpdateGppDetails
})(CreateGppDetails);
