import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DashboardSidebar from "./sidebar";

/**
 * Mock the SidebarItem component to isolate Sidebar tests.
 * Returns a simple div with test ID and displays the icon and label.
 */
jest.mock("../../sidebar/item/item", () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ icon, label }: any) => (
    <div data-testid="sidebar-item">
      {icon}
      <span>{label}</span>
    </div>
  ),
}));

/**
 * Mock the SidebarSection component to isolate Sidebar tests.
 * Returns a simple div with test ID, displays the title, and renders children.
 */
jest.mock("../../sidebar/section/section", () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ title, children }: any) => (
    <div data-testid="sidebar-section">
      <p>{title}</p>
      {children}
    </div>
  ),
}));

/**
 * Track call count and store the click‑outside callback.
 * This allows us to simulate clicking outside the sidebar.
 */
let callCount = 0;
let sidebarCallback: (() => void) | null = null;

/**
 * Mock the useClickOutside hook.
 * We capture the callback provided on the first call so we can invoke it later.
 */
jest.mock("../../../hooks/useClickOutside", () => ({
  useClickOutside: jest.fn((_ref, callback) => {
    callCount++;

    if (callCount === 1) {
      sidebarCallback = callback;
    }
  }),
}));

/**
 * Mock the LogoutModal component.
 * Shows a simple div with a test ID and a text indicating its open/closed state.
 * Also mocks the ASSETS constant used by the sidebar.
 */
jest.mock("../../modals/logout-modal", () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ isOpen }: any) => (
    <div data-testid="logout-modal">{isOpen ? "OPEN" : "CLOSED"}</div>
  ),
  ASSETS: {
    dashboard: "dashboard.svg",
    users: "users.svg",
    guarantors: "guarantors.svg",
    money: "money.svg",
    handshake: "handshake.svg",
    piggybank: "piggybank.svg",
    loanRequest: "loanRequest.svg",
    whitelist: "whitelist.svg",
    blacklist: "blacklist.svg",
    organization1: "org1.svg",
    organization2: "org2.svg",
    bank: "bank.svg",
    coins: "coins.svg",
    transaction: "transaction.svg",
    services: "services.svg",
    settings: "settings.svg",
    settlement: "settlement.svg",
    reports: "reports.svg",
    preferences: "preferences.svg",
    pricing: "pricing.svg",
    audit: "audit.svg",
    systems: "systems.svg",
    logout: "logout.svg",
  },
}));

/**
 * Test suite for the DashboardSidebar component.
 * 
 * The DashboardSidebar is a navigation sidebar that:
 * - Can be opened/closed via a prop
 * - Contains a "Switch Organization" dropdown
 * - Shows multiple sections (Customers, Businesses, Settings)
 * - Includes a logout button that opens a modal
 * - Uses a click‑outside hook to close when clicking outside the sidebar
 */
describe("DashboardSidebar", () => {
  let onCloseMock: jest.Mock;
  let menuBtnRefMock: React.RefObject<HTMLButtonElement | null>;

  /**
   * Reset mocks and create fresh instances before each test.
   * This ensures test isolation and prevents state leakage.
   */
  beforeEach(() => {
    onCloseMock = jest.fn();
    menuBtnRefMock = React.createRef<HTMLButtonElement>();
    callCount = 0;
    sidebarCallback = null;
  });

  /**
   * Test that the sidebar receives the "open" CSS class when open={true}.
   * This class is responsible for the slide‑in animation and visibility.
   */
  test("renders sidebar with open class when open=true", () => {
    render(
      <DashboardSidebar
        open={true}
        onClose={onCloseMock}
        menuBtnRef={menuBtnRefMock}
      />
    );
    const sidebar = screen.getByRole("complementary");
    expect(sidebar).toHaveClass("dashboard-sidebar open");
  });

  /**
   * Test that the sidebar does NOT receive the "open" class when open={false}.
   * The sidebar should be hidden or off‑screen in this state.
   */
  test("renders sidebar without open class when open=false", () => {
    render(
      <DashboardSidebar
        open={false}
        onClose={onCloseMock}
        menuBtnRef={menuBtnRefMock}
      />
    );
    const sidebar = screen.getByRole("complementary");
    expect(sidebar).toHaveClass("dashboard-sidebar");
    expect(sidebar).not.toHaveClass("open");
  });

  /**
   * Test the "Switch Organization" dropdown toggle behavior.
   * - Clicking the button should show the dropdown (with "Lendsqr" visible)
   * - Clicking again should hide the dropdown
   */
  test("toggles organization dropdown on click", () => {
    render(
      <DashboardSidebar
        open
        onClose={onCloseMock}
        menuBtnRef={menuBtnRefMock}
      />
    );

    const switchOrgBtn = screen.getByText("Switch Organization");

    // Initially the dropdown should be hidden
    expect(screen.queryByText("Lendsqr")).not.toBeInTheDocument();

    // First click opens the dropdown
    fireEvent.click(switchOrgBtn);
    expect(screen.getByText("Lendsqr")).toBeInTheDocument();

    // Second click closes the dropdown
    fireEvent.click(switchOrgBtn);
    expect(screen.queryByText("Lendsqr")).not.toBeInTheDocument();
  });

  /**
   * Test organization selection flow.
   * - Open the dropdown
   * - Select an organization ("Lendstar")
   * - Verify the selected organization is displayed
   * - Verify the dropdown closes after selection
   */
  test("selecting an organization updates selected org and closes dropdown", () => {
    render(
      <DashboardSidebar
        open
        onClose={onCloseMock}
        menuBtnRef={menuBtnRefMock}
      />
    );

    // Open dropdown and select "Lendstar"
    fireEvent.click(screen.getByText("Switch Organization"));
    fireEvent.click(screen.getByText("Lendstar"));

    // Selected organization should be visible
    expect(screen.getByText("Lendstar")).toBeInTheDocument();

    // Dropdown should be closed (Lendsqr not visible)
    expect(screen.queryByText("Lendsqr")).not.toBeInTheDocument();
  });

  /**
   * Test logout modal behavior.
   * - Modal should be closed initially (shows "CLOSED")
   * - Clicking the logout button should open the modal (shows "OPEN")
   */
  test("renders logout modal closed initially and opens on clicking logout", () => {
    render(
      <DashboardSidebar
        open={true}
        onClose={onCloseMock}
        menuBtnRef={menuBtnRefMock}
      />
    );

    // Modal should start closed
    expect(screen.getByTestId("logout-modal")).toHaveTextContent("CLOSED");

    // Click logout button
    const logoutBtn = screen.getByText("Logout").closest("div")!;
    fireEvent.click(logoutBtn);

    // Modal should now be open
    expect(screen.getByTestId("logout-modal")).toHaveTextContent("OPEN");
  });

  /**
   * Test that all sidebar sections and items are rendered.
   * Verifies the sidebar contains the expected structure:
   * - 3 sections (Customers, Businesses, Settings)
   * - Multiple sidebar items within those sections
   */
  test("renders all sections and sidebar items", () => {
    render(
      <DashboardSidebar
        open={true}
        onClose={onCloseMock}
        menuBtnRef={menuBtnRefMock}
      />
    );

    const sections = screen.getAllByTestId("sidebar-section");
    expect(sections.length).toBe(3);

    const items = screen.getAllByTestId("sidebar-item");
    expect(items.length).toBeGreaterThan(0);
  });

  /**
   * Test the click‑outside functionality.
   * - The useClickOutside hook should be called with a callback
   * - When we invoke that callback, onClose should be triggered
   * This simulates a user clicking outside the sidebar to close it
   */
  test("calls onClose when clicking outside", () => {
    render(
      <DashboardSidebar
        open={true}
        onClose={onCloseMock}
        menuBtnRef={menuBtnRefMock}
      />
    );

    // The hook should have provided a callback
    expect(sidebarCallback).not.toBeNull();

    // Simulate clicking outside by invoking the captured callback
    sidebarCallback!();

    // onClose should have been called exactly once
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});