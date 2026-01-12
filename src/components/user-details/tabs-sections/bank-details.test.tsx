import { testInfoGroupTab } from "../../../utils/test-helpers/testInfoGroupTab";
import BankDetails from "./bank-details";
import { createMockUser } from "../../../utils/test-helpers/mockUserData";


describe("BankDetails Tab", () => {
  const mockUser = createMockUser();

  testInfoGroupTab({
    component: <BankDetails userData={mockUser} />,
    expectedGroups: [
      {
        title: "Bank Details",
        items: [
          { label: "Bank Name", value: "Providus Bank" },
          { label: "Account Number", value: "9912345678" },
          { label: "Account Balance", value: "₦200,000" },
        ],
      },
    ],
  });
});