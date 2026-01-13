import { testInfoGroupTab } from "../../../utils/test-helpers/testInfoGroupTab";
import BankDetails from "./bank-details";
import { createMockUser } from "../../../utils/test-helpers/mockUserData";

/**
 * Test suite for the BankDetails tab
 *
 * Ensures that bank-related user information
 * is rendered correctly using mock user data.
 */
describe("BankDetails Tab", () => {
  // Generate mock user data for testing
  const mockUser = createMockUser();

  testInfoGroupTab({
    // Component under test with required props
    component: <BankDetails userData={mockUser} />,

    // Expected InfoGroup output
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
