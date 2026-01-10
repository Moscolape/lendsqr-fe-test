import { render, screen, fireEvent, act } from "@testing-library/react";
import DashboardNavbar from "./navbar";
import React from "react";

jest.mock("../../../constants/assets", () => ({
  ASSETS: {
    logo: "logo.svg",
    search: "search.svg",
    notification: "notification.svg",
    avatar: "avatar.svg",
    chevronDown: "chevronDown.svg",
  },
}));

jest.mock("../../../hooks/useClickOutside", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useClickOutside: (_ref: any, handler: () => void) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalThis as any).__outsideClickHandler = handler;
  },
}));

describe("DashboardNavbar", () => {
  let toggleSidebarMock: jest.Mock;
  let menuBtnRefMock: React.RefObject<HTMLButtonElement | null>;

  beforeEach(() => {
    toggleSidebarMock = jest.fn();
    menuBtnRefMock = React.createRef<HTMLButtonElement>();
  });

  test("renders all main navbar elements", () => {
    render(
      <DashboardNavbar
        toggleSidebar={toggleSidebarMock}
        menuBtnRef={menuBtnRefMock}
      />
    );

    expect(screen.getByRole("button", { name: /menu/i })).toBeInTheDocument();
    expect(screen.getByAltText(/Lendsqr logo/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Search for anything/i)
    ).toBeInTheDocument();

    expect(screen.getByText(/Docs/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Notifications/i)).toBeInTheDocument();
    expect(screen.getByText(/Adedeji/i)).toBeInTheDocument();
  });

  test("menu button calls toggleSidebar when clicked", () => {
    render(
      <DashboardNavbar
        toggleSidebar={toggleSidebarMock}
        menuBtnRef={menuBtnRefMock}
      />
    );

    const menuBtn = screen.getByRole("button", { name: /menu/i });
    fireEvent.click(menuBtn);

    expect(toggleSidebarMock).toHaveBeenCalledTimes(1);
  });

  test("user dropdown toggles on click", () => {
    render(
      <DashboardNavbar
        toggleSidebar={toggleSidebarMock}
        menuBtnRef={menuBtnRefMock}
      />
    );

    const userProfile = screen.getByText(/Adedeji/i).closest("div")!;

    expect(screen.queryByText(/Profile/i)).not.toBeInTheDocument();

    fireEvent.click(userProfile);
    expect(screen.getByText(/Profile/i)).toBeInTheDocument();
    expect(screen.getByText(/Settings/i)).toBeInTheDocument();

    fireEvent.click(userProfile);
    expect(screen.queryByText(/Profile/i)).not.toBeInTheDocument();
  });

  test("search input can be typed into", () => {
    render(
      <DashboardNavbar
        toggleSidebar={toggleSidebarMock}
        menuBtnRef={menuBtnRefMock}
      />
    );
    const searchInput = screen.getByPlaceholderText(
      /Search for anything/i
    ) as HTMLInputElement;

    fireEvent.change(searchInput, { target: { value: "Hello world" } });
    expect(searchInput.value).toBe("Hello world");
  });

  test("dropdown closes when clicking outside", () => {
    render(
      <DashboardNavbar
        toggleSidebar={toggleSidebarMock}
        menuBtnRef={menuBtnRefMock}
      />
    );

    fireEvent.click(screen.getByText(/Adedeji/i));
    expect(screen.getByText(/Profile/i)).toBeInTheDocument();

    act(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (globalThis as any).__outsideClickHandler();
    });

    expect(screen.queryByText(/Profile/i)).not.toBeInTheDocument();
  });
});
