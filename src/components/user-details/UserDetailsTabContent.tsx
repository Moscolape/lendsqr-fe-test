import AppAndSystem from "./tabs-sections/AppSystem";
import BankDetails from "./tabs-sections/BankDetails";
import Documents from "./tabs-sections/Documents";
import GeneralDetails from "./tabs-sections/GeneralDetails";
import Loans from "./tabs-sections/Loans";
import Savings from "./tabs-sections/Savings";

import "./UserDetails.scss";

interface Props {
  activeTab: string;
}

const UserDetailsTabContent: React.FC<Props> = ({ activeTab }) => {
  switch (activeTab) {
    case "Documents":
      return <Documents />;
    case "Bank Details":
      return <BankDetails />;
    case "Loans":
      return <Loans />;
    case "Savings":
      return <Savings />;
    case "App and System":
      return <AppAndSystem />;
    default:
      return <GeneralDetails />;
  }
};
export default UserDetailsTabContent;
