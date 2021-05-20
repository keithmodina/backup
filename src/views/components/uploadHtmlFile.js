import React, { Fragment, useState } from 'react';
import styled from '@emotion/styled';
import SvgIcon from './SvgIcon';
import Upload from '../../assets/icons/common/upload.svg';
import Modal from './Modal';

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
  marginTop: 36,
  cursor: 'pointer'
}));

const Input = styled('input')({
  visibility: 'hidden'
});

const ModalTitle = styled('div')({
  fontFamily: 'SamsungOne',
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: 20,
  lineHeight: '24px',
  padding: 36
});

const ModalDesc = styled('div')({
  padding: '0 36px 27px 36px'
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
const UploadHtmlFile = ({ setDetails, details }) => {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const handleHtmlFile = e => {
    const input = e.target;
    if ('files' in input && input.files.length > 0 && input.files[0].type === 'text/html') {
      placeFileContent(input.files[0]);
    } else {
      setIsPopUpOpen(true);
    }
  };

  const placeFileContent = file => {
    readFileContent(file).then(content => {
      setDetails({
        ...details,
        content
      });
    }).catch(error => console.log(error));
  };

  const readFileContent = file => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = event => resolve(event.target.result);
      reader.onerror = error => reject(error);
      reader.readAsText(file);
    });
  };

  const handleUploadClick = () => {
    const inputElement = document.getElementById('upload-file');
    inputElement.click();
    setIsPopUpOpen(false);
  };
  return (
    <Fragment>
      <Input type='file' id='upload-file' onChange={handleHtmlFile} accept='.htm, .html' />
      <UploadFile onClick={handleUploadClick}>
        <Icon
          width={24}
          height={24}
          marginRight={16}
          symbol={Upload}
        />
        Upload File
      </UploadFile>
      <Modal isOpen={isPopUpOpen} contentStyle={{ width: 504 }}>
        <ModalTitle>Invalid file type</ModalTitle>
        <ModalDesc>The file that you are trying to upload is unsupported. Please upload .html files only.</ModalDesc>
        <ModalButtonContainer>
          <ModalButtonText onClick={() => setIsPopUpOpen(false)}>Cancel</ModalButtonText>
          <ModalButtonText onClick={handleUploadClick}>Upload another</ModalButtonText>
        </ModalButtonContainer>
      </Modal>
    </Fragment>
  );
};

export default UploadHtmlFile;
