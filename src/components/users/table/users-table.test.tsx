/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from "@testing-library/react";
import UsersTable, { type UserRow } from "./users-table";
import { useUserFilters } from "../../../hooks/useUserFilters";

const emptyFilters = {
  organization: "",
  username: "",
  email: "",
  phone: "",
  date: "",
  status: "",
};

jest.mock(
  "../../users/ui/users-table-header",
  () =>
    ({ onChange, onReset }: any) =>
      (
        <>
          <thead data-testid="mock-header">
            <tr>
              <th>Organization</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Date Joined</th>
              <th>Status</th>
            </tr>
          </thead>
          <div>
            <button
              data-testid="change-filter"
              onClick={() => onChange("organization", "TestOrg")}
            >
              Change
            </button>
            <button data-testid="reset-filter" onClick={onReset}>
              Reset
            </button>
          </div>
        </>
      )
);

jest.mock("../ui/user-row", () => ({ user }: any) => (
  <tr data-testid="mock-row">
    <td>{user.organization}</td>
    <td>{user.username}</td>
    <td>{user.email}</td>
    <td>{user.phoneNumber}</td>
    <td>{user.dateJoined}</td>
    <td>{user.status}</td>
  </tr>
));

jest.mock("../../../hooks/useUserFilters");

describe("UsersTable Component", () => {
  const mockedUseUserFilters = useUserFilters as jest.MockedFunction<
    typeof useUserFilters
  >;

  const data: UserRow[] = [
    {
      id: "1",
      organization: "Org1",
      username: "user1",
      email: "user1@example.com",
      phoneNumber: "12345678",
      dateJoined: "2026-01-01",
      status: "active",
    },
    {
      id: "2",
      organization: "Org2",
      username: "user2",
      email: "user2@example.com",
      phoneNumber: "87654321",
      dateJoined: "2026-01-02",
      status: "inactive",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockedUseUserFilters.mockReturnValue({
      filters: {
        organization: "",
        username: "",
        email: "",
        phone: "",
        date: "",
        status: "",
      },
      setFilters: jest.fn(),
      resetFilters: jest.fn(),
      filteredData: data,
    });
  });

  test("renders table with headers and rows", () => {
    render(<UsersTable data={data} />);

    expect(screen.getByTestId("mock-header")).toBeInTheDocument();
    const rows = screen.getAllByTestId("mock-row");
    expect(rows).toHaveLength(2);
  });

  test("calls onChange when header filter Change button is clicked", () => {
    const mockSetFilters = jest.fn();
    mockedUseUserFilters.mockReturnValue({
      filters: emptyFilters,
      setFilters: mockSetFilters,
      resetFilters: jest.fn(),
      filteredData: data,
    });

    render(<UsersTable data={data} />);
    fireEvent.click(screen.getByTestId("change-filter"));

    expect(mockSetFilters).toHaveBeenCalledWith(expect.any(Function));
  });

  test("calls onReset when header filter Reset button is clicked", () => {
    const mockReset = jest.fn();
    mockedUseUserFilters.mockReturnValue({
      filters: emptyFilters,
      setFilters: jest.fn(),
      resetFilters: mockReset,
      filteredData: data,
    });

    render(<UsersTable data={data} />);
    fireEvent.click(screen.getByTestId("reset-filter"));

    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  test("renders correctly with empty data", () => {
    mockedUseUserFilters.mockReturnValue({
      filters: emptyFilters,
      setFilters: jest.fn(),
      resetFilters: jest.fn(),
      filteredData: [],
    });

    render(<UsersTable data={[]} />);
    const rows = screen.queryAllByTestId("mock-row");
    expect(rows).toHaveLength(0);
    expect(screen.getByTestId("mock-header")).toBeInTheDocument();
  });
});
