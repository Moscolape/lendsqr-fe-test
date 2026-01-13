import type { User } from "../../../globalTypes";
import AppAndSystem from "./tabs-sections/app-system";
import BankDetails from "./tabs-sections/bank-details";
import Documents from "./tabs-sections/documents";
import GeneralDetails from "./tabs-sections/general-details";
import Loans from "./tabs-sections/loans";
import Savings from "./tabs-sections/savings";

import "./user-details.scss";

interface Props {
  // Currently active tab label
  activeTab: string;

  // User data shared across tabs that require it
  userData: User;
}

// Acts as a tab content router based on the activeTab value
const UserDetailsTabContent: React.FC<Props> = ({ activeTab, userData }) => {
  switch (activeTab) {
    case "Documents":
      return <Documents />;

    case "Bank Details":
      return <BankDetails userData={userData} />;

    case "Loans":
      return <Loans />;

    case "Savings":
      return <Savings />;

    case "App and System":
      return <AppAndSystem />;

    // Default fallback to prevent blank UI for unexpected tab values
    default:
      return <GeneralDetails userData={userData} />;
  }
};

export default UserDetailsTabContent;
