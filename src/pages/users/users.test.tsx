/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, act, waitFor } from "@testing-library/react";
import Users from "./users";
import { MemoryRouter } from "react-router-dom";
import mockApi from "../../services/mockApi";
import { createMockUser } from "../../utils/test-helpers/mockUserData";


jest.mock("../../services/mockApi", () => ({
  __esModule: true,
  default: {
    getUsers: jest.fn(() =>
      Promise.resolve({
        users: [],
        totalCount: 0,
        totalPages: 0,
        currentPage: 1,
      })
    ),
    getFormattedStats: jest.fn(() =>
      Promise.resolve({
        totalUsers: "0",
        activeUsers: "0",
        usersWithLoans: "0",
        usersWithSavings: "0",
      })
    ),
  },
}));


jest.mock("../../components/users/ui/user-stats", () => ({
  __esModule: true,
  default: () => <div data-testid="user-stats">User Stats</div>,
}));

jest.mock("../../components/users/table/users-table", () => ({
  __esModule: true,
  default: ({ data }: any) => (
    <div data-testid="users-table">
      UsersTable Component with {data.length} users
    </div>
  ),
}));

jest.mock("../../components/users/pagination/pagination", () => ({
  __esModule: true,
  default: () => <div data-testid="pagination">Pagination</div>,
}));

jest.mock("../../components/dashboard/wrapper/wrapper", () => ({
  __esModule: true,
  default: ({ children }: any) => (
    <div data-testid="dashboard-wrapper">{children}</div>
  ),
}));

describe("Users Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly with no users", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <Users />
        </MemoryRouter>
      );
    });

    expect(screen.getByText("Users")).toBeInTheDocument();

    expect(screen.getByTestId("user-stats")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId("users-table")).toBeInTheDocument();
      expect(
        screen.getByText(/UsersTable Component with 0 users/)
      ).toBeInTheDocument();
    });
  });

  test("shows loading skeleton initially", async () => {
    const mockApiInstance = mockApi as jest.Mocked<typeof mockApi>;
    mockApiInstance.getUsers.mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(
            () =>
              resolve({
                users: [],
                totalCount: 0,
                totalPages: 0,
                currentPage: 1,
              }),
            100
          );
        })
    );

    await act(async () => {
      render(
        <MemoryRouter>
          <Users />
        </MemoryRouter>
      );
    });

    expect(screen.getByText("Users")).toBeInTheDocument();
  });

  test("renders empty state when no users", async () => {
    const mockApiInstance = mockApi as jest.Mocked<typeof mockApi>;
    mockApiInstance.getUsers.mockResolvedValue({
      users: [],
      totalCount: 0,
      totalPages: 0,
      currentPage: 1,
    });

    await act(async () => {
      render(
        <MemoryRouter>
          <Users />
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      const usersTable = screen.getByTestId("users-table");
      expect(usersTable).toBeInTheDocument();
      expect(usersTable).toHaveTextContent("UsersTable Component with 0 users");
    });
  });

  test("loads and displays users when API returns data", async () => {
    const mockUsers = [createMockUser()];

    const mockApiInstance = mockApi as jest.Mocked<typeof mockApi>;
    mockApiInstance.getUsers.mockResolvedValue({
      users: mockUsers,
      totalCount: 1,
      totalPages: 1,
      currentPage: 1,
    });

    mockApiInstance.getFormattedStats.mockResolvedValue({
      totalUsers: "1",
      activeUsers: "1",
      usersWithLoans: "0",
      usersWithSavings: "0",
    });

    await act(async () => {
      render(
        <MemoryRouter>
          <Users />
        </MemoryRouter>
      );
    });


    await waitFor(() => {
      expect(screen.getByTestId("users-table")).toBeInTheDocument();
      expect(
        screen.getByText(/UsersTable Component with 1 users/)
      ).toBeInTheDocument();
    });
  });
});
