import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeroContainer = styled.section`
    background-image: url(${props => props.backgroundImage});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 600px;  // Adjust this as needed
    width: 100vw;  // Takes up full width
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    text-align: center;
    padding: 0 2rem;
`;

const HeroText = styled.h1`
    font-size: 4.5rem;
    font-weight: 500;
    margin-bottom: 1rem;
`;

const SubText = styled.p`
    font-size: 2rem;
    margin-bottom: 2rem;
`;

const HeroButton = styled(Link)`
    background-color: #000;
    color: #fff;
    padding: 1rem 2rem;
    text-decoration: none;
    font-size: 1rem;
`;

const HeroSection = ({ backgroundImage, heroText, subText, buttonText, buttonLink }) => {
  return (
    <HeroContainer backgroundImage={backgroundImage}>
      <HeroText>{heroText}</HeroText>
      <SubText>{subText}</SubText>
      {buttonText && buttonLink && <HeroButton to={buttonLink}>{buttonText}</HeroButton>}
    </HeroContainer>
  );
}

export default HeroSection;
