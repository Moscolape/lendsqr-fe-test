import { render, screen, fireEvent } from "@testing-library/react";
import DashboardWrapper from "./wrapper";

jest.mock("../navbar/navbar", () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: jest.fn(({ toggleSidebar, menuBtnRef }: any) => (
    <div data-testid="dashboard-navbar">
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

jest.mock("../sidebar/sidebar", () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: jest.fn(({ open, onClose }: any) => (
    <div data-testid="dashboard-sidebar" className={open ? "open" : ""}>
      Sidebar
      <button onClick={onClose} data-testid="close-sidebar-btn">
        Close
      </button>
    </div>
  )),
}));

describe("DashboardWrapper", () => {
  const ChildContent = () => <div data-testid="child-content">Hello World</div>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders Navbar, Sidebar, and main content", () => {
    render(
      <DashboardWrapper>
        <ChildContent />
      </DashboardWrapper>
    );

    expect(screen.getByTestId("dashboard-navbar")).toBeInTheDocument();
    expect(screen.getByTestId("dashboard-sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("child-content")).toHaveTextContent(
      "Hello World"
    );
  });

  test("sidebar is closed by default", () => {
    render(
      <DashboardWrapper>
        <ChildContent />
      </DashboardWrapper>
    );

    const sidebar = screen.getByTestId("dashboard-sidebar");
    expect(sidebar).not.toHaveClass("open");
  });

  test("clicking toggle button opens the sidebar", () => {
    render(
      <DashboardWrapper>
        <ChildContent />
      </DashboardWrapper>
    );

    const toggleBtn = screen.getByTestId("toggle-sidebar-btn");
    const sidebar = screen.getByTestId("dashboard-sidebar");

    fireEvent.click(toggleBtn);

    expect(sidebar).toHaveClass("open");
  });

  test("clicking toggle button twice closes the sidebar", () => {
    render(
      <DashboardWrapper>
        <ChildContent />
      </DashboardWrapper>
    );

    const toggleBtn = screen.getByTestId("toggle-sidebar-btn");
    const sidebar = screen.getByTestId("dashboard-sidebar");

    fireEvent.click(toggleBtn);
    fireEvent.click(toggleBtn);

    expect(sidebar).not.toHaveClass("open");
  });

  test("sidebar closes when onClose is called", () => {
    render(
      <DashboardWrapper>
        <ChildContent />
      </DashboardWrapper>
    );

    const toggleBtn = screen.getByTestId("toggle-sidebar-btn");
    fireEvent.click(toggleBtn);

    const closeBtn = screen.getByTestId("close-sidebar-btn");
    fireEvent.click(closeBtn);

    const sidebar = screen.getByTestId("dashboard-sidebar");
    expect(sidebar).not.toHaveClass("open");
  });

  test("child content remains visible when toggling sidebar", () => {
    render(
      <DashboardWrapper>
        <ChildContent />
      </DashboardWrapper>
    );

    const toggleBtn = screen.getByTestId("toggle-sidebar-btn");
    fireEvent.click(toggleBtn);
    fireEvent.click(toggleBtn);

    expect(screen.getByTestId("child-content")).toHaveTextContent(
      "Hello World"
    );
  });
});
