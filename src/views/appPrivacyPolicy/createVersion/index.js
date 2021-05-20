import React, {
  useState,
  Fragment,
  useEffect
} from 'react';
import cookie from 'js-cookie';
import { connect } from 'react-redux';

import { tabs, TAB_CONTENT, TAB_OPTION } from '../../../constants/tabs';
import { USERNAME } from '../../../constants/storage';
import { ROUTE_PRIVACY_POLICY } from '../../../constants/routes';

import isEmpty from '../../../utils/isEmpty';
import { isContentEmpty } from '../../../utils/contentValidation';
import { convertDateTimeToVersionFormat } from '../../../utils/dateConverter';

import PrivacyPolicyContent from './privacyPolicyContent';
import PrivacyPolicyOptions from './privacyPolicyOptions';
import Tab from '../../components/Tabs';
import TitleAndButtonsContainer from '../../layouts/TitleAndButtonsContainer';

import { actionNavigateTo } from '../../../reduxModules/common/routes';
import { actionCreatePrivacyPolicy, actionGetGppVersion } from '../../../reduxModules/appPrivacyPolicy';

const CreateVersion = ({
  gppId,
  newVersionId,
  privacyDetails,
  actionCreatePrivacyPolicy,
  actionGetGppVersion,
  actionNavigateTo,
  gppDetails
}) => {
  const initialOptions = [{
    _id: '',
    header: '',
    name: '',
    options: []
  }];
  const [optionData, setOptionData] = useState(initialOptions);
  const [currVersion, setCurrVersion] = useState(null);
  const [isOptionsEmpty, setIsOptionsEmpty] = useState(true);
  const [activeTab, setActiveTab] = useState(TAB_CONTENT);
  const [createTabs, setTabs] = useState(tabs);
  const [isError, setPageError] = useState({
    version: false,
    content: false,
    options: false
  });
  const [details, setDetails] = useState({
    gpp: gppId,
    content: String(''),
    version: null,
    publishedBy: cookie.get(USERNAME) || '',
    options: optionData
  });

  useEffect(() => {
    if (!isEmpty(newVersionId)) {
      actionNavigateTo(ROUTE_PRIVACY_POLICY, { id: newVersionId });
    }
  }, [newVersionId]);

  const handleDateChange = date => {
    setCurrVersion(date);
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
      if (option.options) {
        option.options.forEach((subOption, subOptIdx) => {
          subOption.index = optionIdx;
          subOption.subIndex = subOptIdx;
          subOption.hasDuplicate = false;
          subOption.isIdEmpty = subOption._id === '';
          subOption.isNameEmpty = subOption.name === '';
          optionsHasError = optionsHasError || (subOption.isNameEmpty || subOption.isIdEmpty);
          valuesArray.push(subOption);
        });
      }
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

    if (dups.length || optionsHasError) {
      // mark options as error
      setOptionData([...optionData]);
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
      if (option.options) {
        option.options.forEach(subOption => {
          delete subOption.hasDuplicate;
          delete subOption.isNameEmpty;
          delete subOption.isIdEmpty;
          delete subOption.index;
          delete subOption.subIndex;
        });
      }
    });

    setOptionData([...data]);
  };

  const handleOnPublish = async () => {
    const isValid = await isValuesValid();

    if (isValid) {
      cleanupOptionData();
      actionCreatePrivacyPolicy({
        ...details,
        version: convertDateTimeToVersionFormat(currVersion),
        options: optionData
      });
    }
  };

  const isValuesValid = async () => {
    const selectedVersion = !isEmpty(currVersion) && await actionGetGppVersion({ gpp: details.gpp, version: convertDateTimeToVersionFormat(currVersion) });
    const isVersionValid = !isEmpty(currVersion) && isEmpty(selectedVersion.data);
    const isContentValid = !isContentEmpty(details.content);
    const isOptionsValid = !getOptionsErrors();

    setPageError({
      ...isError,
      version: !isVersionValid,
      content: !isContentValid,
      options: !isOptionsValid,
      duplicate: !isEmpty(selectedVersion.data)
    });
    setActiveTab(!isVersionValid || !isContentValid ? TAB_CONTENT : TAB_OPTION);

    createTabs[TAB_CONTENT].error = !isVersionValid || !isContentValid;
    createTabs[TAB_OPTION].error = !isOptionsValid;

    setTabs({ ...createTabs });

    return isOptionsValid && isContentValid && isVersionValid;
  };

  const hasOptionValue = (isPrevOptions = false) => {
    const hasValue = optionData.some(option => option.header !== ''
      || option.name !== ''
      || option._id !== ''
      || hasSubOptions(option.options)
    );

    if (isPrevOptions && isError.options) {
      createTabs[TAB_OPTION].error = false;
      setTabs({ ...createTabs });
    }
    setIsOptionsEmpty(!hasValue && !isPrevOptions);
  };

  const hasSubOptions = subOptions => subOptions.some(sub => sub._id !== '' || sub.name !== '');

  const handleOptions = options => setOptionData(options);

  return (
    <Fragment>
      <TitleAndButtonsContainer
        title='Create new version'
        countryName={!isEmpty(gppDetails) ? gppDetails.country.countryName : privacyDetails.countryName}
        languageName={!isEmpty(gppDetails) ? gppDetails.language.languageName : privacyDetails.language}
        newContent={details.content}
        version={currVersion}
        isOptionsEmpty={isOptionsEmpty}
        handleOnclick={handleOnPublish}
        isCreate
      />
      <Tab.Container>
        <Tab.Buttons tabs={Object.values(createTabs)} activeTab={activeTab} handleActiveTab={tab => setActiveTab(tab)} />
        <Tab.TabsContainer>
          <Tab className={TAB_CONTENT} isActive={activeTab === TAB_CONTENT}>
            <PrivacyPolicyContent
              details={details}
              setDetails={setDetails}
              version={currVersion}
              isDateError={isError.version}
              isContentError={isError.content}
              isDuplicate={isError.duplicate}
              handleCalendarDateChange={handleDateChange}
              handleCalendarOk={() => setDetails({ ...details, version: currVersion })}
              handleCalendarCancel={() => setCurrVersion(details.version)}
              onChangeContent={newContent => setDetails({ ...details, content: newContent })}
            />
          </Tab>
          <Tab className={TAB_OPTION} isActive={activeTab === TAB_OPTION}>
            <PrivacyPolicyOptions
              isError={isError.options}
              optionData={optionData}
              handleOptions={handleOptions}
              hasOptionValue={hasOptionValue}
            />
          </Tab>
        </Tab.TabsContainer>
      </Tab.Container>
    </Fragment>
  );
};

export default connect(state => ({
  gppId: state.location.payload.id,
  newVersionId: state.privacypolicy.newVersionId,
  privacyDetails: state.privacypolicy.privacyPolicyDetails,
  gppDetails: state.privacypolicy.gppDetails
}), {
  actionCreatePrivacyPolicy,
  actionGetGppVersion,
  actionNavigateTo
})(CreateVersion);
