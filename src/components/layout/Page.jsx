import React from 'react';
import styled from 'styled-components'

const Page = styled.div`
    margin-top: 0rem;
    padding-bottom: 60px;  // Room for the button at the bottom
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    height: 90vh;  // Take up the full viewport height

    @media (min-width: 768px) {  // Example breakpoint for larger devices
      margin-top: 3rem;
      justify-content: flex-start;
      height: auto;
      padding-bottom: 0;
    }
`;

export default Page;
