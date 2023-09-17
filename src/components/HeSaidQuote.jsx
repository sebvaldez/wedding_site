

import React from 'react';
import styled from 'styled-components';

const StyledQuote = styled.blockquote`
  text-align: center;
  @media (max-width: 1024px) {
    // For viewports smaller than 1024px, the max-width will be the full viewport width
    max-width: calc(85vw);
  }
  max-width: calc(65vw);
  margin: 0 auto;  // centers the container on larger screens
`;


const HeSaidQuote = () => {
  return (
    <>
      <h2><em>He said...</em></h2>

      <StyledQuote>
        Allegra and I always stayed in touch after moving out of our hometown. Our shared sense of independence and curiosity created an instinctual sense of respect, comfort and trust with one another.

        <br /><br />
        Over the years, we found that during moments of significant life changes, we reached out to each other for advice and perspective.
        <br /><br />

        When I left my first adult job, she helped me write my resignation letter. When she wanted to move to the Bay Area, I was encouraging her to make a change. When she did,
        our friendship grew into a relationship, and it was here that we had some of the most memorable laughs and conversations while exploring great coffee and food.
        <br /><br />

        Having Allegra in my life is like having a secret power up! In my many hobbies and work projects, no matter how long they last,
        she is always interested and encouraging. I love that we share enthusiasm for each other’s uniqueness, and the particular ways in which she helps me remain organized (even with my doom piles, haha sorry babe).
        <br /><br />

        So, as the moment approached to shop for a ring, I felt an immense pressure to find the perfect ring, ensuring every detail and 'tech spec' was just right.
        Then, during one of my online searches, I stumbled upon THE ONE. I knew I needed to hold it. That ring transported me into our future, I saw our life together. I was flooded with excitement, joy, and love for Allegra with the hopes of asking her to marry me.
        <br /><br />

        I am incredibly thankful to have her as my future wife and look forward to continuing to reciprocate the love, care, and energy she brings.
        <br /><br />
      </StyledQuote>
    </>
  )
}

export default HeSaidQuote
