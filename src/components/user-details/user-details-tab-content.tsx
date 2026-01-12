import type { User } from "../../../globalTypes";
import AppAndSystem from "./tabs-sections/app-system";
import BankDetails from "./tabs-sections/bank-details";
import Documents from "./tabs-sections/documents";
import GeneralDetails from "./tabs-sections/general-details";
import Loans from "./tabs-sections/loans";
import Savings from "./tabs-sections/savings";

import "./user-details.scss";

interface Props {
  activeTab: string;
  userData: User;
}

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
    default:
      return <GeneralDetails userData={userData} />;
  }
};
export default UserDetailsTabContent;
