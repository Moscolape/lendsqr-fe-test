import { render, screen, fireEvent } from "@testing-library/react";
import UsersTableHeader from "./users-table-header";
import type { Filters } from "../../../hooks/useUserFilters";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
jest.mock("../dropdowns/filter/filter-dropdown", () => ({ onChange, onReset, onFilter, onClose }: any) => (
  <div data-testid="mock-filter-dropdown">
    <button onClick={() => onChange("organization", "TestOrg")}>Change</button>
    <button onClick={onReset}>Reset</button>
    <button onClick={onFilter}>Filter</button>
    <button onClick={onClose}>Close</button>
  </div>
));

describe("UsersTableHeader Component", () => {
  const filters: Filters = {
    organization: "",
    username: "",
    email: "",
    phone: "",
    date: "",
    status: "",
  };

  const onChange = jest.fn();
  const onReset = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders all header labels", () => {
    render(
      <table>
        <UsersTableHeader filters={filters} onChange={onChange} onReset={onReset} />
      </table>
    );

    expect(screen.getByText("Organization")).toBeInTheDocument();
    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Phone Number")).toBeInTheDocument();
    expect(screen.getByText("Date Joined")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
  });

  test("renders FilterDropdown in Organization header after clicking icon", () => {
    render(
      <table>
        <UsersTableHeader filters={filters} onChange={onChange} onReset={onReset} />
      </table>
    );


    const filterIcon = screen.getAllByRole("img")[0];
    fireEvent.click(filterIcon);

    expect(screen.getByTestId("mock-filter-dropdown")).toBeInTheDocument();
  });

  test("calls onChange and onReset when dropdown buttons are clicked", () => {
    render(
      <table>
        <UsersTableHeader filters={filters} onChange={onChange} onReset={onReset} />
      </table>
    );


    const filterIcon = screen.getAllByRole("img")[0];
    fireEvent.click(filterIcon);


    fireEvent.click(screen.getByText("Change"));
    expect(onChange).toHaveBeenCalledWith("organization", "TestOrg");


    fireEvent.click(screen.getByText("Reset"));
    expect(onReset).toHaveBeenCalledTimes(1);
  });
});
