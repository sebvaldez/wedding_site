import styled from 'styled-components';

const ToastWrapper = styled.div`
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  background-color: green;
  color: white;
  padding: .5em 5em;
  border-radius: 4px;
  z-index: 2000;  // to ensure it appears above everything else
`;

const Toast = ({ message }) => {
  return (
    <ToastWrapper>
      {message}
    </ToastWrapper>
  );
};

export default Toast;
