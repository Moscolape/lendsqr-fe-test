import { InfoGroup } from "../ui/InfoGroup";
import "../tabs.scss";

const Savings = () => {
  return (
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
