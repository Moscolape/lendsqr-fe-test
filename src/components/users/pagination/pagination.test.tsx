import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "./Pagination";

describe("Pagination Component", () => {
  const setup = (props = {}) => {
    const defaultProps = {
      totalItems: 100,
      pageSize: 10,
      currentPage: 2,
      totalPages: 10,
      onPageChange: jest.fn(),
      onPageSizeChange: jest.fn(),
    };

    const utils = render(<Pagination {...defaultProps} {...props} />);
    return { ...utils, ...defaultProps, ...props };
  };

  beforeAll(() => {
    Object.defineProperty(window, "scrollTo", {
      value: jest.fn(),
      writable: true,
    });
  });

  test("renders pagination info and controls correctly", () => {
    setup();

    expect(screen.getByText(/Showing/i)).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveValue("10");
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  test("changes page size when select value changes", () => {
    const { onPageSizeChange } = setup();
    const select = screen.getByRole("combobox");

    fireEvent.change(select, { target: { value: "20" } });
    expect(onPageSizeChange).toHaveBeenCalledWith(20);
  });

  test("calls onPageChange when previous/next buttons are clicked", () => {
    const { onPageChange } = setup();

    const prevBtn = screen.getAllByRole("button")[0];
    const nextBtn =
      screen.getAllByRole("button")[screen.getAllByRole("button").length - 1];

    fireEvent.click(prevBtn);
    expect(onPageChange).toHaveBeenCalledWith(1);

    fireEvent.click(nextBtn);
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  test("disables prev button on first page and next button on last page", () => {
    const { rerender } = setup({ currentPage: 1, totalPages: 3 });
    const buttons = screen.getAllByRole("button");
    const prevBtn = buttons[0];
    const nextBtn = buttons[buttons.length - 1];

    expect(prevBtn).toBeDisabled();
    expect(nextBtn).not.toBeDisabled();

    rerender(
      <Pagination
        totalItems={100}
        pageSize={10}
        currentPage={3}
        totalPages={3}
        onPageChange={jest.fn()}
        onPageSizeChange={jest.fn()}
      />
    );

    const updatedButtons = screen.getAllByRole("button");
    expect(updatedButtons[0]).not.toBeDisabled();
    expect(updatedButtons[updatedButtons.length - 1]).toBeDisabled();
  });

  test("does not render anything if totalItems is 0", () => {
    const { container } = setup({ totalItems: 0 });
    expect(container.firstChild).toBeNull();
  });

  test("does not render page numbers beyond bounds (negative case)", () => {
    setup({ currentPage: 1, totalPages: 1 });
    expect(screen.queryByText("0")).not.toBeInTheDocument();
    expect(screen.queryByText("2")).not.toBeInTheDocument();
  });
});
