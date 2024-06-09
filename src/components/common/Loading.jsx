import styled, { keyframes } from 'styled-components';

const bubble = keyframes`
  0%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
`;

const fullscreenStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(255, 255, 255, 1)',  // semi-transparent white
  zIndex: 1000  // or other high value to ensure it sits on top
};

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  justify-content: center;
  height: 100%;

  ${({ fullscreen }) => fullscreen && fullscreenStyle }
`;

const Image = styled.img`
  width: 250px;  // Adjust as needed.
  height: auto;
`;

const EllipsesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  background-color: black;
  border-radius: 50%;
  animation: ${bubble} 1s infinite;

  &:nth-child(2) {
    animation-delay: 0.2s;
  }

  &:nth-child(3) {
    animation-delay: 0.4s;
  }
`;

const Loading = ({ fullscreen = false, message }) => {

  return (
    <LoaderContainer fullscreen={fullscreen}>
      <Image src='https://static-image-bucket-service-dev.s3.us-west-2.amazonaws.com/header/navbrand_logo_v2.png' alt="Loading Icon" />
      { message && <h1>{message}</h1> }
      <EllipsesContainer>
        <Dot></Dot>
        <Dot></Dot>
        <Dot></Dot>
      </EllipsesContainer>
    </LoaderContainer>
  );
};

export default Loading;
