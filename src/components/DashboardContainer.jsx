import styled from "styled-components";

const DashboardContainer = styled.div`
  display: grid;
  gap: 15px;
  padding: 15px;
  // Start with a base grid setup that works well on smaller screens
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));

  // Adjust for larger screens if necessary
  @media (min-width: 769px) {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  }
`;

export default DashboardContainer;
