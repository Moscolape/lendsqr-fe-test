/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, act, waitFor } from "@testing-library/react";
import UserStats from "./user-stats";
import mockApi from "../../../services/mockApi";


jest.mock("../../../services/mockApi", () => ({
  __esModule: true,
  default: {
    getFormattedStats: jest.fn(),
  },
}));

jest.mock("../stats/stats-card", () => ({
  __esModule: true,
  default: ({ stats }: any) => (
    <div data-testid="stats-cards">
      {stats.map((stat: any) => (
        <div key={stat.id} data-testid={`stat-card-${stat.id}`}>
          <span data-testid="stat-label">{stat.label}</span>
          <span data-testid="stat-value">{stat.value}</span>
        </div>
      ))}
    </div>
  ),
}));

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
  },
}));


const mockGetFormattedStats =
  mockApi.getFormattedStats as jest.Mock;

describe("UserStats Component", () => {
  beforeEach(() => {
    mockGetFormattedStats.mockClear();
  });

  test("shows placeholder stats initially while loading", async () => {
    mockGetFormattedStats.mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              totalUsers: "2,453",
              activeUsers: "2,453",
              usersWithLoans: "12,453",
              usersWithSavings: "102,453",
            });
          }, 100);
        })
    );

    await act(async () => {
      render(<UserStats />);
    });

    const values = screen
      .getAllByTestId("stat-value")
      .map((el) => el.textContent);

    expect(values[0]).toBe("2453");
    expect(values[1]).toBe("2453");
    expect(values[2]).toBe("12,453");
    expect(values[3]).toBe("102,453");

    expect(mockGetFormattedStats).toHaveBeenCalledTimes(1);
  });

  test("loads and displays real stats after API call completes", async () => {
    mockGetFormattedStats.mockResolvedValue({
      totalUsers: "2,453",
      activeUsers: "2,453",
      usersWithLoans: "12,453",
      usersWithSavings: "102,453",
    });

    render(<UserStats />);

    await waitFor(() => {
      const values = screen
        .getAllByTestId("stat-value")
        .map((el) => el.textContent);

      expect(values[0]).toBe("2,453");
      expect(values[1]).toBe("2,453");
      expect(values[2]).toBe("12,453");
      expect(values[3]).toBe("102,453");
    });
  });

  test("shows labels correctly", async () => {
    mockGetFormattedStats.mockResolvedValue({
      totalUsers: "2,453",
      activeUsers: "2,453",
      usersWithLoans: "12,453",
      usersWithSavings: "102,453",
    });

    render(<UserStats />);

    await waitFor(() => {
      expect(screen.getByText("Users")).toBeInTheDocument();
      expect(screen.getByText("Active Users")).toBeInTheDocument();
      expect(screen.getByText("Users with Loans")).toBeInTheDocument();
      expect(screen.getByText("Users with Savings")).toBeInTheDocument();
    });
  });
});
