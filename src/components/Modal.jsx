import React from 'react';
// import React, { useState } from 'react';
import styled from 'styled-components';
// import { animated, useSpring } from 'react-spring';
import ModalPortal from './ModalPortal';

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background: white;
  padding: 20px;
  border-radius: 8px;
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

// const StyledBackdrop = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background: rgba(0, 0, 0, 0.7);
//   z-index: 999;
// `;

// const StyledModal = styled(animated.div)`
//   position: fixed;
//   top: 50%;
//   left: 50%;
//   width: 100%;
//   transform: translate(-50%, -50%);
//   z-index: 1000;
//   background: white;
//   padding: 20px;
//   border-radius: 8px;
//   overflow-y: auto;
// `;

const Modal = ({ onClose, children }) => (
  <ModalPortal>
    <ModalBackdrop onClick={onClose} />
    <StyledModal>
      {children}
    </StyledModal>
  </ModalPortal>
);


export default Modal;
