import React from 'react'
import styled from 'styled-components'
const ImageContainer = styled.div`
  width: 80%;
  height: ${props => props.height ? props.height : 'auto'};
  overflow: hidden;
  margin: 1rem 0;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledResponsiveImage = styled.img`
  width: 100%; // Ensure the image takes the full width of its container
  display: block; // To remove any spacing below the image
  max-height: 100%; // Ensure it doesn't exceed the container height
  object-fit: cover; // This will ensure the image covers the container without skewing
`;

const ResponsiveImage = ({src, alt, height, children}) => {
  return (
    <ImageContainer height={height}>
      <StyledResponsiveImage src={src} alt={alt}>
        {children}
      </StyledResponsiveImage>
    </ImageContainer>
  );
}

export default ResponsiveImage;