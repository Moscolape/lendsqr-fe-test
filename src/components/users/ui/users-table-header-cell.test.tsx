import { render, screen, fireEvent } from "@testing-library/react";
import HeaderCell from "./users-table-header-cell";

// Mock dropdown component to test dropdown behavior in isolation
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MockDropdown = ({ onClose }: any) => (
  <div data-testid="mock-dropdown">
    <button onClick={onClose}>Close</button>
  </div>
);

describe("HeaderCell Component", () => {
  test("renders label without dropdown", () => {
    // Render inside table context since <th> must be in <tr>
    render(<table><thead><tr><HeaderCell label="Name" /></tr></thead></table>);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-dropdown")).not.toBeInTheDocument();
  });

  test("renders dropdown when clicked", () => {
    render(
      <table>
        <thead>
          <tr>
            <HeaderCell label="Filter">
              <MockDropdown />
            </HeaderCell>
          </tr>
        </thead>
      </table>
    );

    // The dropdown trigger is an <img>, simulate click
    const icon = screen.getByRole("img");
    fireEvent.click(icon);

    // Dropdown should appear
    expect(screen.getByTestId("mock-dropdown")).toBeInTheDocument();

    // Clicking close should hide dropdown
    fireEvent.click(screen.getByText("Close"));
    expect(screen.queryByTestId("mock-dropdown")).not.toBeInTheDocument();
  });
});
