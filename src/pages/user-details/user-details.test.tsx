/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from "@testing-library/react";
import UserDetails from "./user-details";
import { MemoryRouter, Route, Routes } from "react-router-dom";

// Mock DashboardWrapper to simplify rendering
jest.mock("../../components/dashboard/wrapper/wrapper", () => ({
  __esModule: true,
  default: ({ children }: any) => (
    <div data-testid="dashboard-wrapper">{children}</div>
  ),
}));

// Mock UserDetailsHeader component
jest.mock(
  "../../components/user-details/user-details-header",
  () =>
    ({ activeTab, onTabChange, userId, userData }: any) => {
      console.log("Mock header received:", { activeTab, userId, userData });
      return (
        <div data-testid="user-details-header">
          UserDetailsHeader Component - activeTab: {activeTab}, userId: {userId}
          <button onClick={() => onTabChange("Activity")}>Change Tab</button>
        </div>
      );
    }
);

// Mock UserDetailsTabContent component
jest.mock(
  "../../components/user-details/user-details-tab-content",
  () =>
    ({ activeTab, userData }: any) => {
      console.log("Mock tab content received:", { activeTab, userData });
      return (
        <div data-testid="user-details-tab-content">
          UserDetailsTabContent Component - activeTab: {activeTab}
        </div>
      );
    }
);

// Mock API service for user data
jest.mock("../../services/mockApi", () => ({
  __esModule: true,
  default: {
    getUserById: jest.fn(() =>
      Promise.resolve({
        id: "123",
        profile: { firstName: "John", lastName: "Doe" },
      })
    ),
  },
}));

describe("UserDetails Page", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks before each test
  });

  test("shows error state when no userId param", async () => {
    render(
      <MemoryRouter initialEntries={["/user-details"]}>
        <Routes>
          <Route path="/user-details" element={<UserDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await screen.findByText("User ID not provided");

    expect(screen.getByText("User ID not provided")).toBeInTheDocument();
    expect(screen.getByText("Back to Users")).toBeInTheDocument();
  });

  test("renders loading state initially with userId param", async () => {
    render(
      <MemoryRouter initialEntries={["/user-details/123"]}>
        <Routes>
          <Route path="/user-details/:userId" element={<UserDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId("dashboard-wrapper")).toBeInTheDocument();
  });

  test("renders UserDetails page with userId param after loading", async () => {
    render(
      <MemoryRouter initialEntries={["/user-details/123"]}>
        <Routes>
          <Route path="/user-details/:userId" element={<UserDetails />} />
        </Routes>
      </MemoryRouter>
    );

    const header = await screen.findByTestId("user-details-header");
    expect(header).toBeInTheDocument();

    expect(screen.getByText(/UserDetailsHeader Component/)).toBeInTheDocument();
    expect(screen.getByText(/userId: 123/)).toBeInTheDocument();

    const tabContent = await screen.findByTestId("user-details-tab-content");
    expect(tabContent).toBeInTheDocument();
    expect(screen.getByText(/UserDetailsTabContent Component/)).toBeInTheDocument();
  });

  test("tab changes when button is clicked", async () => {
    render(
      <MemoryRouter initialEntries={["/user-details/123"]}>
        <Routes>
          <Route path="/user-details/:userId" element={<UserDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await screen.findByTestId("user-details-header");

    // Simulate tab change
    const button = screen.getByText("Change Tab");
    fireEvent.click(button);

    const tabContent = await screen.findByTestId("user-details-tab-content");
    expect(tabContent).toHaveTextContent(/activeTab: Activity/);
  });
});
