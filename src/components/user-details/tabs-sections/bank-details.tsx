import { InfoGroup } from "../ui/info-group";
import "../tabs.scss";
import type { User } from "../../../../globalTypes";

/**
 * Props definition for tab components
 * that depend on user data.
 */
interface TabComponentProps {
  userData: User;
}

/**
 * BankDetails
 *
 * Renders banking information for a user,
 * including bank name, account number, and balance.
 */
const BankDetails: React.FC<TabComponentProps> = ({ userData }) => {
  return (
    // Wrapper card for bank details tab
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
