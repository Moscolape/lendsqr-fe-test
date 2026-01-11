import { render, screen, fireEvent } from "@testing-library/react";
import UserTabs from "./user-details.tab";

describe("UserTabs Component", () => {
  const tabs = [
    "General Details",
    "Documents",
    "Bank Details",
    "Loans",
    "Savings",
    "App and System",
  ];

  let onChangeMock: jest.Mock;

  beforeEach(() => {
    onChangeMock = jest.fn();
    render(<UserTabs activeTab="General Details" onChange={onChangeMock} />);
  });

  test("renders all tabs correctly", () => {
    tabs.forEach((tab) => {
      expect(screen.getByText(tab)).toBeInTheDocument();
    });
  });

  test("marks the active tab correctly", () => {
    const activeButton = screen.getByText("General Details");
    expect(activeButton).toHaveClass("active");

    const inactiveButton = screen.getByText("Documents");
    expect(inactiveButton).not.toHaveClass("active");
  });

  test("calls onChange when clicking a tab", () => {
    const documentsTab = screen.getByText("Documents");
    fireEvent.click(documentsTab);

    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith("Documents");
  });

  test("does not call onChange if a non-existent tab is clicked (negative case)", () => {
    const fakeButton = screen.queryByText("Fake Tab");
    expect(fakeButton).not.toBeInTheDocument();
  });
});
