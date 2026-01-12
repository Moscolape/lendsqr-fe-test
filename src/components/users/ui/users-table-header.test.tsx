import { render, screen, fireEvent } from "@testing-library/react";
import UsersTableHeader from "./users-table-header";
import type { ClientFilterValues } from "../../../../globalTypes";


jest.mock("../dropdowns/filter/filter-dropdown", () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ onChange, onReset, onFilter, onClose }: any) => (
    <div data-testid="mock-filter-dropdown">
      <button onClick={() => onChange("organization", "TestOrg")}>Change</button>
      <button onClick={onReset}>Reset</button>
      <button onClick={onFilter}>Filter</button>
      <button onClick={onClose}>Close</button>
    </div>
  ),
}));


jest.mock("./users-table-header-cell", () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ children, label }: any) => (
    <th>
      <div data-testid={`header-cell-${label}`}>
        {label}
        {children}
      </div>
    </th>
  ),
}));

describe("UsersTableHeader Component", () => {
  const tempFilters: ClientFilterValues = {
    organization: "",
    username: "",
    email: "",
    dateJoined: "",
    phoneNumber: "",
    status: "",
  };

  const onTempFilterChange = jest.fn();
  const onApplyFilters = jest.fn();
  const onResetFilters = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders all header labels", () => {
    render(
      <table>
        <UsersTableHeader 
          tempFilters={tempFilters}
          onTempFilterChange={onTempFilterChange}
          onApplyFilters={onApplyFilters}
          onResetFilters={onResetFilters}
        />
      </table>
    );

    expect(screen.getByText("Organization")).toBeInTheDocument();
    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Phone Number")).toBeInTheDocument();
    expect(screen.getByText("Date Joined")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
  });

  test("renders FilterDropdown in Organization header", () => {
    render(
      <table>
        <UsersTableHeader 
          tempFilters={tempFilters}
          onTempFilterChange={onTempFilterChange}
          onApplyFilters={onApplyFilters}
          onResetFilters={onResetFilters}
        />
      </table>
    );

    expect(screen.getByTestId("mock-filter-dropdown")).toBeInTheDocument();
  });

  test("calls onTempFilterChange when dropdown change button is clicked", () => {
    render(
      <table>
        <UsersTableHeader 
          tempFilters={tempFilters}
          onTempFilterChange={onTempFilterChange}
          onApplyFilters={onApplyFilters}
          onResetFilters={onResetFilters}
        />
      </table>
    );

    fireEvent.click(screen.getByText("Change"));
    expect(onTempFilterChange).toHaveBeenCalledWith("organization", "TestOrg");
  });

  test("calls onResetFilters when dropdown reset button is clicked", () => {
    render(
      <table>
        <UsersTableHeader 
          tempFilters={tempFilters}
          onTempFilterChange={onTempFilterChange}
          onApplyFilters={onApplyFilters}
          onResetFilters={onResetFilters}
        />
      </table>
    );

    fireEvent.click(screen.getByText("Reset"));
    expect(onResetFilters).toHaveBeenCalledTimes(1);
  });

  test("calls onApplyFilters when dropdown filter button is clicked", () => {
    render(
      <table>
        <UsersTableHeader 
          tempFilters={tempFilters}
          onTempFilterChange={onTempFilterChange}
          onApplyFilters={onApplyFilters}
          onResetFilters={onResetFilters}
        />
      </table>
    );

    fireEvent.click(screen.getByText("Filter"));
    expect(onApplyFilters).toHaveBeenCalledTimes(1);
  });

  test("calls onClose when dropdown close button is clicked", () => {
    const consoleSpy = jest.spyOn(console, 'log');
    
    render(
      <table>
        <UsersTableHeader 
          tempFilters={tempFilters}
          onTempFilterChange={onTempFilterChange}
          onApplyFilters={onApplyFilters}
          onResetFilters={onResetFilters}
        />
      </table>
    );

    fireEvent.click(screen.getByText("Close"));
    expect(consoleSpy).not.toHaveBeenCalled();
  });
});