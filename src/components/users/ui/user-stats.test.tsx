import { render, screen } from "@testing-library/react";
import UserStats from "./user-stats";

describe("UserStats Component", () => {
  test("renders all stats cards", () => {
    render(<UserStats />);

    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.getByText("Active Users")).toBeInTheDocument();
    expect(screen.getByText("Users with Loans")).toBeInTheDocument();
    expect(screen.getByText("Users with Savings")).toBeInTheDocument();

    expect(screen.getAllByRole("img")).toHaveLength(4);
  });

  test("stats cards have correct labels and values", () => {
    render(<UserStats />);

    const usersCard = screen.getByText("Users").closest(".stats-card");
    expect(usersCard).toHaveTextContent("2,453");

    const activeUsersCard = screen
      .getByText("Active Users")
      .closest(".stats-card");
    expect(activeUsersCard).toHaveTextContent("2,453");

    const loansCard = screen
      .getByText("Users with Loans")
      .closest(".stats-card");
    expect(loansCard).toHaveTextContent("12,453");

    const savingsCard = screen
      .getByText("Users with Savings")
      .closest(".stats-card");
    expect(savingsCard).toHaveTextContent("102,453");
  });
});
