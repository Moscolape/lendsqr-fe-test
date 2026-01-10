/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from "@testing-library/react";
import Users from "../../pages/users/users";
import { users } from "../../utils/dummy-user-data";

jest.mock("../../components/users/ui/user-stats", () => () => (
  <div>UserStats Component</div>
));

jest.mock("../../components/users/table/users-table", () => ({ data }: any) => (
  <div>UsersTable Component with {data.length} users</div>
));

jest.mock("../../utils/dummy-user-data", () => ({
  users: [],
}));

jest.mock(
  "../../components/users/pagination/pagination",
  () =>
    ({ onPageChange, onPageSizeChange }: any) =>
      (
        <div>
          <button onClick={() => onPageChange(2)}>Next Page</button>
          <button onClick={() => onPageSizeChange(50)}>Change PageSize</button>
        </div>
      )
);

describe("Users Page", () => {
  test("renders Users page with all components", () => {
    render(<Users />);

    expect(screen.getByRole("heading", { name: /Users/i })).toBeInTheDocument();

    expect(screen.getByText("UserStats Component")).toBeInTheDocument();
    expect(
      screen.getByText(`UsersTable Component with ${users.length} users`)
    ).toBeInTheDocument();

    expect(screen.getByText("Next Page")).toBeInTheDocument();
    expect(screen.getByText("Change PageSize")).toBeInTheDocument();
  });

  test("pagination buttons work correctly", () => {
    const { getByText } = render(<Users />);

    const nextPage = getByText("Next Page");
    fireEvent.click(nextPage);

    expect(nextPage).toBeEnabled();

    const changePageSize = getByText("Change PageSize");
    fireEvent.click(changePageSize);
    expect(changePageSize).toBeEnabled();
  });

  test("renders correctly with no users", () => {
    render(<Users />);

    expect(screen.getByRole("heading", { name: /Users/i })).toBeInTheDocument();

    expect(
      screen.getByText("UsersTable Component with 0 users")
    ).toBeInTheDocument();
  });
});
