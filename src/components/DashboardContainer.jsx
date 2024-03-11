import styled from "styled-components";

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Stack the charts on smaller screens */
  }
`;

export default DashboardContainer;
