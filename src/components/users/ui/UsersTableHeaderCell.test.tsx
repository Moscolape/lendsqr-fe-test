import { render, screen, fireEvent } from "@testing-library/react";
import HeaderCell from "./UsersTableHeaderCell";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MockDropdown = ({ onClose }: any) => (
  <div data-testid="mock-dropdown">
    <button onClick={onClose}>Close</button>
  </div>
);

describe("HeaderCell Component", () => {
  test("renders label without dropdown", () => {
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

    const icon = screen.getByRole("img");
    fireEvent.click(icon);
    expect(screen.getByTestId("mock-dropdown")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Close"));
    expect(screen.queryByTestId("mock-dropdown")).not.toBeInTheDocument();
  });
});
