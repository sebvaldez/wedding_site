import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeroContainer = styled.section`
    background-image: url(${props => props.backgroundImage});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: ${props => props.height ? props.height : '600px'};
    width: 100%;  // Updated from 100vw to 100%
    overflow: hidden;  // Ensure children do not overflow
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    text-align: center;
    padding: 0 2rem;
    position: relative;
    z-index: 500;
`

const HeroText = styled.h2`
    font-size: ${props => props.HeroTextFontSize ? props.HeroTextFontSize : '4.2rem'};
    font-weight: ${props => props.HeroTextFontWeight ? props.HeroTextFontWeight : '200'};
    line-height: 1.3;
`;

const SubText = styled.p`
    font-size: ${props => props.SubTextFontSize ? props.SubTextFontSize : '2rem'};
    font-weight: 300;
    margin-top: 1.5rem;
    margin-bottom: 2rem;
`;

const HeroButton = styled(Link)`
    background-color: #000;
    color: #fff;
    padding: 1rem 2rem;
    text-decoration: none;
    font-size: 1rem;
`;

const HeroSection = ({ height, backgroundImage, heroText, HeroTextFontSize, HeroTextFontWeight, subText, SubTextFontSize, buttonText, buttonLink }) => {
  return (
    <HeroContainer
      height={height}
      backgroundImage={backgroundImage}
    >
      {heroText.split(' ').map((char, idx) => (
        <HeroText
          key={idx}
          HeroTextFontSize={HeroTextFontSize}
          HeroTextFontWeight={HeroTextFontWeight}
        >
          {char}
        </HeroText>)
      )
      }
      <SubText SubTextFontSize={SubTextFontSize}>{subText}</SubText>
      {buttonText && buttonLink && <HeroButton to={buttonLink}>{buttonText}</HeroButton>}
    </HeroContainer>
  );
}

export default HeroSection;
