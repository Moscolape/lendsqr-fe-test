import { render, screen } from "@testing-library/react";
import UserDetailsTabContent from "./user-details-tab-content";
import { createMockUser } from "../../utils/test-helpers/mockUserData";

// Mock all tab section components to isolate routing logic
// This ensures tests focus only on which component is rendered,
// not the internal UI of each tab.
jest.mock("./tabs-sections/app-system", () => ({
  __esModule: true,
  default: () => <div data-testid="app-system-tab">AppAndSystem Tab</div>,
}));

jest.mock("./tabs-sections/bank-details", () => ({
  __esModule: true,
  default: () => <div data-testid="bank-details-tab">BankDetails Tab</div>,
}));

jest.mock("./tabs-sections/documents", () => ({
  __esModule: true,
  default: () => <div data-testid="documents-tab">Documents Tab</div>,
}));

jest.mock("./tabs-sections/general-details", () => ({
  __esModule: true,
  default: () => (
    <div data-testid="general-details-tab">GeneralDetails Tab</div>
  ),
}));

jest.mock("./tabs-sections/loans", () => ({
  __esModule: true,
  default: () => <div data-testid="loans-tab">Loans Tab</div>,
}));

jest.mock("./tabs-sections/savings", () => ({
  __esModule: true,
  default: () => <div data-testid="savings-tab">Savings Tab</div>,
}));

describe("UserDetailsTabContent Component", () => {
  // Reusable mock user for tabs that require user data
  const mockUser = createMockUser();

  // Centralised tab definitions to avoid repetitive tests
  const tabs = [
    { name: "Documents", testId: "documents-tab" },
    { name: "Bank Details", testId: "bank-details-tab" },
    { name: "Loans", testId: "loans-tab" },
    { name: "Savings", testId: "savings-tab" },
    { name: "App and System", testId: "app-system-tab" },
    { name: "General Details", testId: "general-details-tab" },
  ];

  // Verify that the correct tab component renders for each activeTab value
  tabs.forEach((tab) => {
    test(`renders ${tab.name} when activeTab="${tab.name}"`, () => {
      render(
        <UserDetailsTabContent userData={mockUser} activeTab={tab.name} />
      );
      expect(screen.getByTestId(tab.testId)).toBeInTheDocument();
    });
  });

  // Fallback behaviour: unknown tabs should default to General Details
  test("renders GeneralDetails by default for unknown tab", () => {
    render(
      <UserDetailsTabContent userData={mockUser} activeTab="Unknown Tab" />
    );

    expect(screen.getByTestId("general-details-tab")).toBeInTheDocument();

    // Ensure no other tab content is accidentally rendered
    const otherTabTestIds = [
      "documents-tab",
      "bank-details-tab",
      "loans-tab",
      "savings-tab",
      "app-system-tab",
    ];

    otherTabTestIds.forEach((id) => {
      expect(screen.queryByTestId(id)).not.toBeInTheDocument();
    });
  });
});
