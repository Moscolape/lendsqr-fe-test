import { render, screen, fireEvent } from "@testing-library/react";
import FilterActions from "./filter-actions";

describe("FilterActions Component", () => {
  // Basic render test to ensure UI consistency
  test("renders Reset and Filter buttons", () => {
    const mockReset = jest.fn();
    const mockFilter = jest.fn();

    render(<FilterActions onReset={mockReset} onFilter={mockFilter} />);

    expect(screen.getByText("Reset")).toBeInTheDocument();
    expect(screen.getByText("Filter")).toBeInTheDocument();
  });

  // Reset button should trigger reset handler
  test("calls onReset when Reset button is clicked", () => {
    const mockReset = jest.fn();
    const mockFilter = jest.fn();

    render(<FilterActions onReset={mockReset} onFilter={mockFilter} />);

    fireEvent.click(screen.getByText("Reset"));
    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  // Filter button should trigger filter handler
  test("calls onFilter when Filter button is clicked", () => {
    const mockReset = jest.fn();
    const mockFilter = jest.fn();

    render(<FilterActions onReset={mockReset} onFilter={mockFilter} />);

    fireEvent.click(screen.getByText("Filter"));
    expect(mockFilter).toHaveBeenCalledTimes(1);
  });

  // Ensures no accidental side effects on mount
  test("does not call handlers if buttons are not clicked", () => {
    const mockReset = jest.fn();
    const mockFilter = jest.fn();

    render(<FilterActions onReset={mockReset} onFilter={mockFilter} />);

    expect(mockReset).not.toHaveBeenCalled();
    expect(mockFilter).not.toHaveBeenCalled();
  });
});
