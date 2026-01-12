import { render, screen, fireEvent } from "@testing-library/react";
import DashboardWrapper from "./wrapper";

// Mock the Navbar component to isolate DashboardWrapper tests
// Using jest.fn() to create mock components with testable props and behaviors
jest.mock("../navbar/navbar", () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: jest.fn(({ toggleSidebar, menuBtnRef }: any) => (
    <div data-testid="dashboard-navbar">
      {/* 
        Expose toggleSidebar function for testing sidebar toggle functionality 
        Ref is included to test menu button reference passing
      */}
      <button
        data-testid="toggle-sidebar-btn"
        onClick={toggleSidebar}
        ref={menuBtnRef}
      >
        Toggle Sidebar
      </button>
    </div>
  )),
}));

// Mock the Sidebar component to control its state and behavior
jest.mock("../sidebar/sidebar", () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: jest.fn(({ open, onClose }: any) => (
    <div data-testid="dashboard-sidebar" className={open ? "open" : ""}>
      Sidebar
      {/* 
        Expose onClose function to test sidebar closing via internal close button 
        This tests the sidebar's own close mechanism
      */}
      <button onClick={onClose} data-testid="close-sidebar-btn">
        Close
      </button>
    </div>
  )),
}));

/**
 * Test suite for DashboardWrapper component
 * 
 * DashboardWrapper is a layout component that includes:
 * - Navbar with sidebar toggle functionality
 * - Sidebar that can be opened/closed
 * - Main content area for child components
 * 
 * This test suite verifies:
 * 1. Component rendering and composition
 * 2. Sidebar state management (open/close)
 * 3. Interaction between Navbar and Sidebar components
 * 4. Content preservation during sidebar interactions
 */
describe("DashboardWrapper", () => {
  // Mock child component to test content rendering within DashboardWrapper
  const ChildContent = () => <div data-testid="child-content">Hello World</div>;

  // Clear all mocks before each test to ensure test isolation
  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Test: Component Structure Rendering
   * 
   * Verifies that DashboardWrapper correctly renders all its subcomponents:
   * - Navbar component
   * - Sidebar component  
   * - Child content passed via children prop
   */
  test("renders Navbar, Sidebar, and main content", () => {
    render(
      <DashboardWrapper>
        <ChildContent />
      </DashboardWrapper>
    );

    // Assert all expected components are present in the DOM
    expect(screen.getByTestId("dashboard-navbar")).toBeInTheDocument();
    expect(screen.getByTestId("dashboard-sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("child-content")).toHaveTextContent(
      "Hello World"
    );
  });

  /**
   * Test: Initial Sidebar State
   * 
   * Verifies that the sidebar starts in a closed state by default.
   * This ensures the UI begins in the expected collapsed state.
   */
  test("sidebar is closed by default", () => {
    render(
      <DashboardWrapper>
        <ChildContent />
      </DashboardWrapper>
    );

    const sidebar = screen.getByTestId("dashboard-sidebar");
    // Check that sidebar doesn't have the "open" class initially
    expect(sidebar).not.toHaveClass("open");
  });

  /**
   * Test: Sidebar Open Functionality
   * 
   * Verifies that clicking the navbar toggle button opens the sidebar.
   * This tests the primary user interaction for revealing the sidebar.
   */
  test("clicking toggle button opens the sidebar", () => {
    render(
      <DashboardWrapper>
        <ChildContent />
      </DashboardWrapper>
    );

    const toggleBtn = screen.getByTestId("toggle-sidebar-btn");
    const sidebar = screen.getByTestId("dashboard-sidebar");

    // Simulate user clicking the toggle button
    fireEvent.click(toggleBtn);

    // Verify sidebar now has the "open" class
    expect(sidebar).toHaveClass("open");
  });

  /**
   * Test: Sidebar Toggle Functionality (Open/Close Cycle)
   * 
   * Verifies that the sidebar toggle button works as a proper toggle:
   * - First click opens the sidebar
   * - Second click closes it
   * This ensures the toggle functionality is bidirectional.
   */
  test("clicking toggle button twice closes the sidebar", () => {
    render(
      <DashboardWrapper>
        <ChildContent />
      </DashboardWrapper>
    );

    const toggleBtn = screen.getByTestId("toggle-sidebar-btn");
    const sidebar = screen.getByTestId("dashboard-sidebar");

    // Simulate two toggle clicks (open then close)
    fireEvent.click(toggleBtn);
    fireEvent.click(toggleBtn);

    // Verify sidebar returns to closed state
    expect(sidebar).not.toHaveClass("open");
  });

  /**
   * Test: Sidebar Internal Close Functionality
   * 
   * Verifies that the sidebar can be closed using its internal close button.
   * This tests alternative close mechanisms beyond the navbar toggle.
   */
  test("sidebar closes when onClose is called", () => {
    render(
      <DashboardWrapper>
        <ChildContent />
      </DashboardWrapper>
    );

    // Open the sidebar first
    const toggleBtn = screen.getByTestId("toggle-sidebar-btn");
    fireEvent.click(toggleBtn);

    // Close the sidebar using its internal close button
    const closeBtn = screen.getByTestId("close-sidebar-btn");
    fireEvent.click(closeBtn);

    const sidebar = screen.getByTestId("dashboard-sidebar");
    // Verify sidebar is closed after clicking internal close button
    expect(sidebar).not.toHaveClass("open");
  });

  /**
   * Test: Content Preservation
   * 
   * Verifies that child content remains visible and unaffected 
   * during sidebar open/close operations.
   * This ensures UI state changes don't disrupt main content.
   */
  test("child content remains visible when toggling sidebar", () => {
    render(
      <DashboardWrapper>
        <ChildContent />
      </DashboardWrapper>
    );

    const toggleBtn = screen.getByTestId("toggle-sidebar-btn");
    
    // Perform multiple sidebar toggles
    fireEvent.click(toggleBtn);
    fireEvent.click(toggleBtn);

    // Verify child content remains intact and visible
    expect(screen.getByTestId("child-content")).toHaveTextContent(
      "Hello World"
    );
  });
});