import { render, screen, fireEvent } from "@testing-library/react";
import UserTabs from "./user-details.tab";

describe("UserTabs Component", () => {
  // Source of truth for expected tab labels
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
    // Mock tab change handler
    onChangeMock = jest.fn();

    // Render component with a default active tab
    render(<UserTabs activeTab="General Details" onChange={onChangeMock} />);
  });

  // Ensure all tabs are visible in the UI
  test("renders all tabs correctly", () => {
    tabs.forEach((tab) => {
      expect(screen.getByText(tab)).toBeInTheDocument();
    });
  });

  // Active tab should be visually highlighted
  test("marks the active tab correctly", () => {
    const activeButton = screen.getByText("General Details");
    expect(activeButton).toHaveClass("active");

    const inactiveButton = screen.getByText("Documents");
    expect(inactiveButton).not.toHaveClass("active");
  });

  // Clicking a tab should notify the parent component
  test("calls onChange when clicking a tab", () => {
    const documentsTab = screen.getByText("Documents");
    fireEvent.click(documentsTab);

    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith("Documents");
  });

  // Guard against rendering unexpected or invalid tabs
  test("does not render non-existent tabs (negative case)", () => {
    expect(screen.queryByText("Fake Tab")).not.toBeInTheDocument();
  });
});
