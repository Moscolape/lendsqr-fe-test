import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DashboardSidebar from "./Sidebar";

jest.mock("../../sidebar/item/Item", () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ icon, label }: any) => (
    <div data-testid="sidebar-item">
      {icon}
      <span>{label}</span>
    </div>
  ),
}));

jest.mock("../../sidebar/section/Section", () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ title, children }: any) => (
    <div data-testid="sidebar-section">
      <p>{title}</p>
      {children}
    </div>
  ),
}));

let callCount = 0;
let sidebarCallback: (() => void) | null = null;

jest.mock("../../../hooks/useClickOutside", () => ({
  useClickOutside: jest.fn((_ref, callback) => {
    callCount++;

    if (callCount === 1) {
      sidebarCallback = callback;
    }
  }),
}));

jest.mock("../../modals/LogoutModal", () => ({
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

describe("DashboardSidebar", () => {
  let onCloseMock: jest.Mock;
  let menuBtnRefMock: React.RefObject<HTMLButtonElement | null>;

  beforeEach(() => {
    onCloseMock = jest.fn();
    menuBtnRefMock = React.createRef<HTMLButtonElement>();
    callCount = 0;
    sidebarCallback = null;
  });

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

  test("toggles organization dropdown on click", () => {
    render(
      <DashboardSidebar
        open
        onClose={onCloseMock}
        menuBtnRef={menuBtnRefMock}
      />
    );

    const switchOrgBtn = screen.getByText("Switch Organization");

    expect(screen.queryByText("Lendsqr")).not.toBeInTheDocument();

    fireEvent.click(switchOrgBtn);
    expect(screen.getByText("Lendsqr")).toBeInTheDocument();

    fireEvent.click(switchOrgBtn);
    expect(screen.queryByText("Lendsqr")).not.toBeInTheDocument();
  });

  test("selecting an organization updates selected org and closes dropdown", () => {
    render(
      <DashboardSidebar
        open
        onClose={onCloseMock}
        menuBtnRef={menuBtnRefMock}
      />
    );

    fireEvent.click(screen.getByText("Switch Organization"));
    fireEvent.click(screen.getByText("Lendstar"));

    expect(screen.getByText("Lendstar")).toBeInTheDocument();

    expect(screen.queryByText("Lendsqr")).not.toBeInTheDocument();
  });

  test("renders logout modal closed initially and opens on clicking logout", () => {
    render(
      <DashboardSidebar
        open={true}
        onClose={onCloseMock}
        menuBtnRef={menuBtnRefMock}
      />
    );

    expect(screen.getByTestId("logout-modal")).toHaveTextContent("CLOSED");

    const logoutBtn = screen.getByText("Logout").closest("div")!;
    fireEvent.click(logoutBtn);

    expect(screen.getByTestId("logout-modal")).toHaveTextContent("OPEN");
  });

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

  test("calls onClose when clicking outside", () => {
    render(
      <DashboardSidebar
        open={true}
        onClose={onCloseMock}
        menuBtnRef={menuBtnRefMock}
      />
    );

    expect(sidebarCallback).not.toBeNull();

    sidebarCallback!();

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
