import { InfoGroup } from "../ui/InfoGroup";
import "../tabs.scss";

const BankDetails = () => {
  return (
    <div className="tab-card">
      <InfoGroup
        title="Bank Details"
        items={[
          { label: "Bank Name", value: "Providus Bank" },
          { label: "Account Number", value: "9912345678" },
          { label: "Account Name", value: "Grace Effiom" },
        ]}
      />
    </div>
  );
};

export default BankDetails;
