import React from 'react';
import styled from 'styled-components';

const ImageContainer = styled.div`
  width: 80%;
  height: ${props => props.mobileHeight || '400px'};
  overflow: hidden;
  margin: 1rem 0;

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (min-width: 769px) {
    height: ${props => props.desktopHeight || '600px'};
  }
`;

const StyledResponsiveImage = styled.img`
  width: 100%;
  display: block;
  max-height: 100%;
  object-fit: cover;
  object-position: ${props => props.imagePosition || 'center center'};
`;

const ResponsiveImage = ({src, alt, mobileHeight, desktopHeight, imagePosition, children}) => {
  return (
    <ImageContainer mobileHeight={mobileHeight} desktopHeight={desktopHeight}>
      <StyledResponsiveImage
        src={src}
        alt={alt}
        imagePosition={imagePosition}
      >
        {children}
      </StyledResponsiveImage>
    </ImageContainer>
  );
}

export default ResponsiveImage;
