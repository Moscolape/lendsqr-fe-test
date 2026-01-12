/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent, act } from "@testing-library/react";
import DashboardNavbar from "./navbar";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Mock assets
jest.mock("../../../constants/assets", () => ({
  ASSETS: {
    logo: "logo.svg",
    search: "search.svg",
    notification: "notification.svg",
    avatar: "avatar.svg",
    chevronDown: "chevronDown.svg",
  },
}));

// Mock useClickOutside
jest.mock("../../../hooks/useClickOutside", () => ({
  useClickOutside: (_ref: any, handler: () => void) => {
    (globalThis as any).__outsideClickHandler = handler;
  },
}));

// Mock react-router hooks
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

describe("DashboardNavbar", () => {
  let toggleSidebarMock: jest.Mock;
  let menuBtnRefMock: React.RefObject<HTMLButtonElement | null>;
  let navigateMock: jest.Mock;

  beforeEach(() => {
    toggleSidebarMock = jest.fn();
    menuBtnRefMock = React.createRef<HTMLButtonElement>();
    navigateMock = jest.fn();

    // Mock useNavigate
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    // Default location
    (useLocation as jest.Mock).mockReturnValue({
      pathname: "/dashboard",
      search: "",
    });
  });

  test("renders all main navbar elements", () => {
    render(
      <DashboardNavbar toggleSidebar={toggleSidebarMock} menuBtnRef={menuBtnRefMock} />
    );

    expect(screen.getByRole("button", { name: /menu/i })).toBeInTheDocument();
    expect(screen.getByAltText(/Lendsqr logo/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search for anything/i)).toBeInTheDocument();
    expect(screen.getByText(/Docs/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Notifications/i)).toBeInTheDocument();
    expect(screen.getByText(/Adedeji/i)).toBeInTheDocument();
  });

  test("menu button calls toggleSidebar when clicked", () => {
    render(
      <DashboardNavbar toggleSidebar={toggleSidebarMock} menuBtnRef={menuBtnRefMock} />
    );

    fireEvent.click(screen.getByRole("button", { name: /menu/i }));
    expect(toggleSidebarMock).toHaveBeenCalledTimes(1);
  });

  test("user dropdown toggles on click", () => {
    render(
      <DashboardNavbar toggleSidebar={toggleSidebarMock} menuBtnRef={menuBtnRefMock} />
    );

    const userProfile = screen.getByText(/Adedeji/i).closest("div")!;
    expect(screen.queryByText(/Profile/i)).not.toBeInTheDocument();

    fireEvent.click(userProfile);
    expect(screen.getByText(/Profile/i)).toBeInTheDocument();
    expect(screen.getByText(/Settings/i)).toBeInTheDocument();

    fireEvent.click(userProfile);
    expect(screen.queryByText(/Profile/i)).not.toBeInTheDocument();
  });

  test("search input can be typed into and triggers navigate", () => {
    render(
      <DashboardNavbar toggleSidebar={toggleSidebarMock} menuBtnRef={menuBtnRefMock} />
    );

    const searchInput = screen.getByPlaceholderText(
      /Search for anything/i
    ) as HTMLInputElement;

    fireEvent.change(searchInput, { target: { value: "test search" } });
    expect(searchInput.value).toBe("test search");

    // Press Enter triggers handleSearch
    fireEvent.keyDown(searchInput, { key: "Enter", code: "Enter" });
    expect(navigateMock).toHaveBeenCalledWith("/users?search=test%20search");
  });

  test("clear-search button appears when search has value and clears input", () => {
    render(
      <DashboardNavbar toggleSidebar={toggleSidebarMock} menuBtnRef={menuBtnRefMock} />
    );

    const searchInput = screen.getByPlaceholderText(/Search for anything/i) as HTMLInputElement;

    // Type something
    fireEvent.change(searchInput, { target: { value: "clear me" } });

    const clearBtn = screen.getByRole("button", { name: "✕" });
    expect(clearBtn).toBeInTheDocument();

    // Click clear button
    fireEvent.click(clearBtn);
    expect(searchInput.value).toBe("");
    expect(navigateMock).toHaveBeenCalledWith("/users");
  });

  test("dropdown closes when clicking outside", () => {
    render(
      <DashboardNavbar toggleSidebar={toggleSidebarMock} menuBtnRef={menuBtnRefMock} />
    );

    fireEvent.click(screen.getByText(/Adedeji/i));
    expect(screen.getByText(/Profile/i)).toBeInTheDocument();

    act(() => {
      (globalThis as any).__outsideClickHandler();
    });

    expect(screen.queryByText(/Profile/i)).not.toBeInTheDocument();
  });

  test("search input initializes from URL query param", () => {
    (useLocation as jest.Mock).mockReturnValue({
      pathname: "/users",
      search: "?search=myquery",
    });

    render(
      <DashboardNavbar toggleSidebar={toggleSidebarMock} menuBtnRef={menuBtnRefMock} />
    );

    const searchInput = screen.getByPlaceholderText(/Search for anything/i) as HTMLInputElement;
    expect(searchInput.value).toBe("myquery");
  });
});
