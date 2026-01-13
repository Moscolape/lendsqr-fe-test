import { InfoGroup } from "../ui/info-group";
import "../tabs.scss";

/**
 * Savings
 *
 * Displays the user's savings information,
 * including balance, plan type, and interest rate.
 */
const Savings = () => {
  return (
    // Wrapper card for the Savings tab
    <div className="tab-card">
      <InfoGroup
        title="Savings"
        items={[
          { label: "Savings Balance", value: "₦120,000" },
          { label: "Savings Plan", value: "Monthly" },
          { label: "Interest Rate", value: "5%" },
        ]}
      />
    </div>
  );
};

export default Savings;
