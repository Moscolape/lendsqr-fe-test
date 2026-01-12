import { InfoGroup } from "../ui/info-group";
import "../tabs.scss";
import type { User } from "../../../../globalTypes";

interface TabComponentProps {
  userData: User;
}

const BankDetails: React.FC<TabComponentProps> = ({ userData }) => {
  return (
    <div className="tab-card">
      <InfoGroup
        title="Bank Details"
        items={[
          { label: "Bank Name", value: userData.bank.bankName },
          { label: "Account Number", value: userData.bank.accountNumber },
          {
            label: "Account Balance",
            value: `₦${userData.bank.balance.toLocaleString()}`,
          },
        ]}
      />
    </div>
  );
};

export default BankDetails;
