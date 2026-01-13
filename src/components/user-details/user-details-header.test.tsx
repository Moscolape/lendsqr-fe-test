/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import UserDetailsHeader from "./user-details-header";
import { createMockUser } from "../../utils/test-helpers/mockUserData";

/**
 * Mock Blacklist modal to isolate UserDetailsHeader behavior
 */
jest.mock("../modals/blacklist-modal", () => ({
  __esModule: true,
  default: ({ isOpen, userName, onConfirm, close }: any) =>
    isOpen ? (
      <div data-testid="blacklist-modal">
        Blacklist Modal for {userName}
        <button onClick={onConfirm}>Confirm Blacklist</button>
        <button onClick={close}>Close</button>
      </div>
    ) : null,
}));

/**
 * Mock Activate modal to isolate UserDetailsHeader behavior
 */
jest.mock("../modals/activate-modal", () => ({
  __esModule: true,
  default: ({ isOpen, userName, onConfirm, close }: any) =>
    isOpen ? (
      <div data-testid="activate-modal">
        Activate Modal for {userName}
        <button onClick={onConfirm}>Confirm Activate</button>
        <button onClick={close}>Close</button>
      </div>
    ) : null,
}));

describe("UserDetailsHeader Component", () => {
  const mockUserData = createMockUser();

  const onTabChange = jest.fn();
  const onStatusUpdate = jest.fn();
  const userId = "user-123";
  const tierStars = 2;

  test("disables buttons based on user status", () => {
    const inactiveUserData = { ...mockUserData, status: "blacklisted" };

    render(
      <UserDetailsHeader
        activeTab="General Details"
        onTabChange={onTabChange}
        userId={userId}
        userData={inactiveUserData}
        tierStars={tierStars}
        onStatusUpdate={onStatusUpdate}
      />
    );

    // Blacklist button should be disabled for blacklisted users
    const blacklistButton = screen.getByText("Blacklist User");
    expect(blacklistButton).toBeDisabled();
  });

  test("shows correct bank balance", () => {
    render(
      <UserDetailsHeader
        activeTab="General Details"
        onTabChange={onTabChange}
        userId={userId}
        userData={mockUserData}
        tierStars={tierStars}
        onStatusUpdate={onStatusUpdate}
      />
    );

    // Verify formatted balance and bank details
    expect(screen.getByText("₦200,000.00")).toBeInTheDocument();
    expect(screen.getByText("9912345678/Providus Bank")).toBeInTheDocument();
  });
});
