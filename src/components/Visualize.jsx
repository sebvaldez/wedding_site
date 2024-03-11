
import DashboardContainer from "./DashboardContainer";
import {
  FoodSelectionPieChart,
  // RSVPConfirmationTimeline,
  // TransportationChoicesBarChart,
} from "./charts";

export default function Visualize({ memberData }) {
  return (
    <DashboardContainer>
    <FoodSelectionPieChart memberData={memberData} title="Food Selection" />
    {/* <RSVPConfirmationTimeline userData={weddingData} title="User RSVPs" /> */}
    {/* <TransportationChoicesBarChart
      userData={weddingData}
      title="Transport Choice"
    /> */}
  </DashboardContainer>
  );
}