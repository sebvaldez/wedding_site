import styled from 'styled-components';
import { LoadingEllipse } from './LoadingEllipse';

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


const Loading = ({ fullscreen = false, message }) => {

  return (
    <LoaderContainer fullscreen={fullscreen}>
      <Image src='https://static-image-bucket-service-dev.s3.us-west-2.amazonaws.com/header/navbrand_logo_v2.png' alt="Loading Icon" />
      { message && <h1>{message}</h1> }
      <LoadingEllipse />
    </LoaderContainer>
  );
};

export default Loading;
