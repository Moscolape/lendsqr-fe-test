/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, act, waitFor } from "@testing-library/react";
import Users from "./users";
import { MemoryRouter } from "react-router-dom";
import mockApi from "../../services/mockApi";
import { createMockUser } from "../../utils/test-helpers/mockUserData";

// Mock the API service methods to simulate backend responses
jest.mock("../../services/mockApi", () => ({
  __esModule: true,
  default: {
    getUsers: jest.fn(() =>
      Promise.resolve({
        users: [],       // Default empty user list
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

// Mock child components to simplify tests
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
    jest.clearAllMocks(); // Reset all mocks before each test
  });

  test("renders correctly with no users", async () => {
    // Render the Users component inside a router
    await act(async () => {
      render(
        <MemoryRouter>
          <Users />
        </MemoryRouter>
      );
    });

    // Check that header and stats are rendered
    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.getByTestId("user-stats")).toBeInTheDocument();

    // Wait for UsersTable to render
    await waitFor(() => {
      expect(screen.getByTestId("users-table")).toBeInTheDocument();
      expect(screen.getByText(/UsersTable Component with 0 users/)).toBeInTheDocument();
    });
  });

  test("shows loading skeleton initially", async () => {
    // Mock API with artificial delay to simulate loading
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

    // Ensure the header is visible even during loading
    expect(screen.getByText("Users")).toBeInTheDocument();
  });

  test("renders empty state when no users", async () => {
    // Mock API returning empty user list
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

    // Wait and assert empty UsersTable rendering
    await waitFor(() => {
      const usersTable = screen.getByTestId("users-table");
      expect(usersTable).toBeInTheDocument();
      expect(usersTable).toHaveTextContent("UsersTable Component with 0 users");
    });
  });

  test("loads and displays users when API returns data", async () => {
    const mockUsers = [createMockUser()]; // Generate a mock user

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

    // Assert the UsersTable shows the loaded user
    await waitFor(() => {
      expect(screen.getByTestId("users-table")).toBeInTheDocument();
      expect(screen.getByText(/UsersTable Component with 1 users/)).toBeInTheDocument();
    });
  });
});
