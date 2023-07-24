import React from 'react'
import styled from 'styled-components'

const StyledResponsiveImage = styled.img`
  width: 100%;
  height: auto;
  display: block;  // To remove any spacing below the image
  margin: 1rem 0;  // Add some spacing above and below the image
`;

const ResponsiveImage = ({ children }) => {
  return <StyledResponsiveImage>{children}</StyledResponsiveImage>
}

export default ResponsiveImage;