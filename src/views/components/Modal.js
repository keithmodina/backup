import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Portal } from 'react-portal';

import Text from './Text';
import { MODAL, MODAL_OVERLAY } from '../../constants/zIndex';

const propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
  transparent: PropTypes.bool,
  contentStyle: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])),
  isOpen: PropTypes.bool
};

const defaultProps = {
  children: null,
  onClose: () => { },
  transparent: false,
  contentStyle: {},
  isOpen: false
};

const Overlay = styled('div')({
  position: 'absolute',
  top: 0,
  zIndex: MODAL_OVERLAY,
  justifyContent: 'center',
  display: 'block',
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
  '& div.focus-trap': {
    '&:focus': {
      outline: 'none'
    }
  }
}, ({ theme, transparent, isOpen }) => ({
  backgroundColor: transparent ? 'transparent' : theme.modalOverlayColor,
  transition: isOpen ? 'visibility 0.15s linear 0, opacity 0.15s linear 0' : 'visibility 0.2s linear, opacity 0.15s linear',
  visibility: isOpen ? 'visible' : 'hidden',
  opacity: isOpen ? 1 : 0
}));

const Content = styled('div')(
  {
    zIndex: MODAL,
    borderRadius: 26,
    pointerEvents: 'auto',
    position: 'absolute',
    left: '50%',
    top: '50%',
    margin: 0,
    overflowY: 'auto',
    height: 'auto',
    maxHeight: 'none'
  },
  ({ theme, isOpen }) => ({
    border: `1px solid ${theme.modalBorderColor}`,
    boxShadow: `0 1px 1px 1px ${theme.modalBorderColor}`,
    backgroundColor: theme.modalBgColor,
    transition: isOpen ? 'opacity 0.15s linear, transform 0.3s linear' : 'opacity 0.15s linear, transform 0.2s linear',
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0.9)'
  }),
  ({ contentStyle }) => contentStyle
);

const TitleContainer = styled('div')(({ theme, hasTitle = true }) => ({
  height: 'max-content',
  display: hasTitle ? 'flex' : 'none',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '36px 38px 0'
}));

const Title = styled(Text)({
  height: 24
});

const Header = styled('div')({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between'
});

const Body = styled('div')({
  display: 'block',
  padding: '20px 38px'
});

const Footer = styled('div')({
  display: 'block',
  alignItems: 'center'
});

const ButtonContainer = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
  cursor: 'pointer',
  margin: '0px 30px 35px'
});

const Modal = ({
  children, onClose, transparent, contentStyle, isOpen, width, ...other
}) => (
    <Portal>
      <Overlay
        {...other}
        transparent={transparent}
        isOpen={isOpen}
      >
        <Content isOpen={isOpen} id="modalContent" contentStyle={contentStyle} width={width}>
          {children}
        </Content>
      </Overlay>
    </Portal>
);

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;
Modal.ButtonContainer = ButtonContainer;
Modal.TitleContainer = TitleContainer;
Modal.Title = Title;
Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
