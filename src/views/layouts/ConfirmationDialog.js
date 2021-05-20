import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

import Modal from '../components/Modal';
import FlatButton from '../components/FlatButton';
import { actionCloseConfirmationDialog } from '../../reduxModules/common/dialog';
import Text from '../components/Text';
import isEmpty from '../../utils/isEmpty';

const propTypes = {
  props: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    affirmText: PropTypes.string,
    isSingleButton: PropTypes.bool,
    onAffirm: PropTypes.func,
    onCancel: PropTypes.func
  })
};

const defaultProps = {
  props: {
    title: 'Title',
    content: '',
    affirmText: 'Ok',
    isSingleButton: false,
    onAffirm: () => { },
    onCancel: () => { }
  }
};

const ModalButtonContainer = styled('div')(({ isSingleButton = false }) => ({
  display: 'flex',
  justifyContent: 'center',
  width: isSingleButton ? '100%' : '50%'
}));

const Header = styled(Modal.Header)({
  padding: '36px 38px 0',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
});

const Title = styled(Text)(({ theme }) => ({
  color: theme.primaryTextColor,
  fontSize: 20,
  lineHeight: '18px',
  fontWeight: '700'
}));

const Footer = styled(Modal.Footer)({
  padding: '0 !important',
  margin: 0
});

const ButtonContainer = styled(Modal.ButtonContainer)({
  display: 'flex',
  margin: '0 36px 36px'
});

const LineSeparator = styled('div')(({ theme }) => ({
  width: 1,
  height: 16,
  backgroundColor: theme.dividerColor,
  alignSelf: 'center'
}));

const ModalBody = styled(Modal.Body)(({ width }) => ({
  overflow: 'hidden',
  padding: '36px 36px 39px',
  width
}));

const ConfirmationDialog = ({
  actionCloseConfirmationDialog,
  isOpen,
  props
}) => {
  const {
    title,
    content,
    isSingleButton,
    declineText,
    affirmText,
    onAffirm = () => { },
    onCancel = () => { },
    width
  } = props;
  const [affirmTextInProgress, setAffirmTextInProgress] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const onClickCancel = () => { // close modal here
    actionCloseConfirmationDialog();
  };

  const onClickAffirm = () => {
    if (isOpen) {
      onAffirm();
    }
  };

  return (
    <Modal data-testid="confirmation-dialog" width={width} isOpen={isOpen && !isEmpty(props)} onClose={onClickCancel} tabIndex={-1}>
      { title && (
        <Header>
          <Title id="modalTitle">{title}</Title>
        </Header>
      )}
      <ModalBody width={width}>
        {content}
      </ModalBody>
      <Footer>
        <ButtonContainer>
          {(isSingleButton || affirmTextInProgress)
            ? ''
            : (
              <ModalButtonContainer isSingleButton={isSingleButton}>
                <FlatButton data-testid="dialog-cancel" bold autoFocus id="dialog-cancel" onClick={onClickCancel} tabIndex={0} disabled={isDisabled}>
                  <span>
                    {declineText}
                  </span>
                </FlatButton>
              </ModalButtonContainer>
            )}
          {(isSingleButton || affirmTextInProgress) ? '' : <LineSeparator />}
          <ModalButtonContainer isSingleButton={isSingleButton || affirmTextInProgress}>
            <FlatButton data-testid="affirm-btn" bold autoFocus id="dialog-confirm" onClick={onClickAffirm} disabled={affirmTextInProgress || isDisabled} tabIndex={0}>
              <span data-testid="affirm-text">
                {affirmTextInProgress || affirmText}
              </span>
            </FlatButton>
          </ModalButtonContainer>
        </ButtonContainer>
      </Footer>
    </Modal>
  );
};

ConfirmationDialog.propTypes = propTypes;
ConfirmationDialog.defaultProps = defaultProps;

export default connect(state => ({
  isOpen: state.common.dialog.isConfirmationDialogOpen,
  props: state.common.dialog.confirmationDialogProps
}), {
  actionCloseConfirmationDialog
})(ConfirmationDialog);
