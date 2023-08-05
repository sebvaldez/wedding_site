import React from 'react'
import styled from 'styled-components'

const StyledResponsiveImage = styled.img`
  width: 80%;
  height: auto;
  display: block;  // To remove any spacing below the image
  margin: 1rem 0;  // Add some spacing above and below the image
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ResponsiveImage = ({ src, alt, children }) => {
  return <StyledResponsiveImage src={src} alt={alt}>{children}</StyledResponsiveImage>
}

export default ResponsiveImage;