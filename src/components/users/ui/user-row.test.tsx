/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserRowItem from "./user-row";
import type { UserRow } from "../table/users-table";

// Mock modals to test modal opening logic
jest.mock("../../modals/blacklist-modal", () => ({ isOpen }: any) => (
  <>{isOpen && <div data-testid="blacklist-modal">Blacklist Modal Open</div>}</>
));

jest.mock("../../modals/activate-modal", () => ({ isOpen }: any) => (
  <>{isOpen && <div data-testid="activate-modal">Activate Modal Open</div>}</>
));

// Mock UserActionsDropdown to isolate dropdown behavior
jest.mock(
  "../dropdowns/user-actions/user-actions-dropdown",
  () =>
    ({ onAction }: any) =>
      (
        <div data-testid="user-actions-dropdown">
          <button onClick={() => onAction("view")}>View</button>
          <button onClick={() => onAction("blacklist")}>Blacklist</button>
          <button onClick={() => onAction("activate")}>Activate</button>
        </div>
      )
);

// Sample user data for tests
const user: UserRow = {
  id: "1",
  organization: "Org1",
  username: "user1",
  email: "org1@gmail.com",
  phoneNumber: "12345678",
  dateJoined: "2026-01-01",
  status: "active",
};

describe("UserRowItem Component", () => {
  test("renders user data correctly", () => {
    render(
      <MemoryRouter>
        <table>
          <tbody>
            <UserRowItem user={user} isLast={false} />
          </tbody>
        </table>
      </MemoryRouter>
    );

    // Ensure all fields are rendered
    expect(screen.getByText("Org1")).toBeInTheDocument();
    expect(screen.getByText("user1")).toBeInTheDocument();
    expect(screen.getByText("12345678")).toBeInTheDocument();
    expect(screen.getByText("active")).toBeInTheDocument();
  });

  test("opens and closes actions dropdown", () => {
    render(
      <MemoryRouter>
        <table>
          <tbody>
            <UserRowItem user={user} isLast={false} />
          </tbody>
        </table>
      </MemoryRouter>
    );

    const kebabBtn = screen.getByRole("button");
    fireEvent.click(kebabBtn);

    expect(screen.getByTestId("user-actions-dropdown")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Blacklist"));
    expect(
      screen.queryByTestId("user-actions-dropdown")
    ).not.toBeInTheDocument();
  });

  test("opens blacklist modal on blacklist action", () => {
    render(
      <MemoryRouter>
        <table>
          <tbody>
            <UserRowItem user={user} isLast={false} />
          </tbody>
        </table>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /more actions/i }));
    fireEvent.click(screen.getByText("Blacklist"));
    expect(screen.getByTestId("blacklist-modal")).toHaveTextContent(
      "Blacklist Modal Open"
    );
  });

  test("opens activate modal on activate action", () => {
    render(
      <MemoryRouter>
        <table>
          <tbody>
            <UserRowItem user={user} isLast={false} />
          </tbody>
        </table>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /more actions/i }));
    fireEvent.click(screen.getByText("Activate"));
    expect(screen.getByTestId("activate-modal")).toHaveTextContent(
      "Activate Modal Open"
    );
  });

  test("does not render modals initially", () => {
    render(
      <MemoryRouter>
        <table>
          <tbody>
            <UserRowItem user={user} isLast={false} />
          </tbody>
        </table>
      </MemoryRouter>
    );

    expect(screen.queryByTestId("blacklist-modal")).not.toBeInTheDocument();
    expect(screen.queryByTestId("activate-modal")).not.toBeInTheDocument();
  });
});
