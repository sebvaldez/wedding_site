
import DashboardContainer from "./DashboardContainer";
import {
  FoodSelectionPieChart,
  RSVPConfirmationTimeline,
  TransportationChoicesBarChart,
} from "./charts";

export default function Visualize({ memberData }) {
  return (
    <DashboardContainer>
    <FoodSelectionPieChart memberData={memberData} title="Food Selection" />
    <RSVPConfirmationTimeline memberData={memberData} title="User RSVPs" />
    <TransportationChoicesBarChart
      memberData={memberData}
      title="Transport Choice"
    />
  </DashboardContainer>
  );
}