import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
// import { animated, useSpring } from 'react-spring';
import ModalPortal from './ModalPortal';

const StyledModal = styled.div`
  width: 85%; /* Default to mobile */
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background: white;
  padding: 20px;
  border-radius: 8px;

  @media (min-width: 769px) {
    width: 70%; /* Tablet */
  }

  @media (min-width: 1025px) {
    width: 60%; /* Desktop */
  }
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 900;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

const StyledModalHeader = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: .2rem;
  text-align: center;
  color: #333;
`;

const StyledModalContent = styled.div`
  height: 400px;
  /* border: 1px solid #ddd; */
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.2rem;

  @media (min-width: 769px) {
    width: 80%; /* Tablet */
    height: 550px;
  }

  @media (min-width: 1025px) {
    /* Desktop */
    height: 600px;
  }
`;

const Modal = ({ onClose, children }) => (
  <ModalPortal>
    <ModalBackdrop onClick={onClose} />
    <StyledModal>
    <CloseButton onClick={onClose}>
      <FontAwesomeIcon icon={faClose} size='lg'  />
    </CloseButton>
      {children}
    </StyledModal>
  </ModalPortal>
);

Modal.Header = ({ children }) => <StyledModalHeader>{children}</StyledModalHeader>;
Modal.Content = ({ children }) => <StyledModalContent>{children}</StyledModalContent>;


export default Modal;
