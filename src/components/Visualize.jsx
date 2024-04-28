import styled from "styled-components";
import DashboardContainer from "./DashboardContainer";
import {
  FoodSelectionPieChart,
  RSVPConfirmationCount,
  RSVPConfirmationTimeline,
  DrinkPreferenceBarChart,
  TransportationChoicesBarChart,
} from "./charts";

const BarChartWrapper = styled.div`
  grid-column: span 2; // Make the bar chart span two columns, or adjust as needed

  @media (max-width: 768px) {
    grid-column: span 1; // On smaller screens, take up the full width
  }
`;



export default function Visualize({ memberData }) {
  return (
    <DashboardContainer>
      <FoodSelectionPieChart memberData={memberData} title="Food Selection" />

      <BarChartWrapper>
        <DrinkPreferenceBarChart
          memberData={memberData}
          title="Drink Preference"
        />
      </BarChartWrapper>

      <BarChartWrapper>
        <RSVPConfirmationTimeline memberData={memberData} title="User RSVPs" />
      </BarChartWrapper>

      <RSVPConfirmationCount memberData={memberData} title="RSVP Confirmation" />

      <BarChartWrapper>
        <TransportationChoicesBarChart
          memberData={memberData}
          title="Transport Choice"
        />
      </BarChartWrapper>
  </DashboardContainer>
  );
}