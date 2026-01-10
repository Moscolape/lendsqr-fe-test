import { render, screen } from "@testing-library/react";
import UserDetailsTabContent from "./user-details-tab-content";


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
  default: () => <div data-testid="general-details-tab">GeneralDetails Tab</div>,
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
  const tabs = [
    { name: "Documents", testId: "documents-tab" },
    { name: "Bank Details", testId: "bank-details-tab" },
    { name: "Loans", testId: "loans-tab" },
    { name: "Savings", testId: "savings-tab" },
    { name: "App and System", testId: "app-system-tab" },
    { name: "General Details", testId: "general-details-tab" },
  ];

  tabs.forEach((tab) => {
    test(`renders ${tab.name} when activeTab="${tab.name}"`, () => {
      render(<UserDetailsTabContent activeTab={tab.name} />);
      expect(screen.getByTestId(tab.testId)).toBeInTheDocument();
    });
  });

  test("renders GeneralDetails by default for unknown tab", () => {
    render(<UserDetailsTabContent activeTab="Unknown Tab" />);
    expect(screen.getByTestId("general-details-tab")).toBeInTheDocument();

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
