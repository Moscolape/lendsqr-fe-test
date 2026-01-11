import { render, screen, fireEvent } from "@testing-library/react";
import LogoutModal from "./logout-modal";
import React from "react";

jest.mock("./wrapper/modal-wrapper", () => ({
  __esModule: true,
  default: ({
    isOpen,
    close,
    children,
  }: {
    isOpen: boolean;
    close: () => void;
    children: React.ReactNode;
  }) => (isOpen ? <div onClick={close}>{children}</div> : null),
}));

describe("LogoutModal", () => {
  let closeMock: jest.Mock;

  beforeEach(() => {
    closeMock = jest.fn();

    jest.spyOn(Storage.prototype, "clear");

    Object.defineProperty(window, "location", {
      value: { href: "" },
      writable: true,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("does not render when isOpen is false (negative case)", () => {
    render(<LogoutModal isOpen={false} close={closeMock} />);

    expect(screen.queryByText(/Logging Out/i)).not.toBeInTheDocument();
  });

  test("renders logout modal content when open (positive case)", () => {
    render(<LogoutModal isOpen={true} close={closeMock} />);

    expect(screen.getByText(/Logging Out/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Are you sure you want to log out/i)
    ).toBeInTheDocument();
  });

  test("clicking 'No' button calls close (positive interaction)", () => {
    render(<LogoutModal isOpen={true} close={closeMock} />);

    fireEvent.click(screen.getByText(/No/i));

    expect(closeMock).toHaveBeenCalledTimes(1);
  });

  test("clicking 'Yes' clears storage and redirects (positive case)", () => {
    render(<LogoutModal isOpen={true} close={closeMock} />);

    fireEvent.click(screen.getByText(/Yes/i));

    expect(sessionStorage.clear).toHaveBeenCalled();
    expect(localStorage.clear).toHaveBeenCalled();
    expect(window.location.href).toBe("/");
  });

  test("clicking inside modal does not trigger close (negative case)", () => {
    render(<LogoutModal isOpen={true} close={closeMock} />);

    fireEvent.click(screen.getByText(/Logging Out/i));

    expect(closeMock).not.toHaveBeenCalled();
  });
});
