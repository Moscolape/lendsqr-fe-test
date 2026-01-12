import { render, screen, fireEvent } from "@testing-library/react";
import FilterDropdown, { type FilterValues } from "./filter-dropdown";

jest.mock("../../../../configs/filterConfig", () => ({
  filterConfig: [
    { key: "organization", label: "Organization", type: "text" },
    { key: "username", label: "Username", type: "text" },
    { key: "status", label: "Status", type: "text" },
  ],
}));

jest.mock("../../../../hooks/useClickOutside", () => ({
  useClickOutside: jest.fn(),
}));

describe("FilterDropdown Component", () => {
  const defaultValues: FilterValues = {
    organization: "",
    username: "",
    email: "",
    dateJoined: "",
    phoneNumber: "",
    status: "",
  };

  const setup = (values = defaultValues) => {
    const onChange = jest.fn();
    const onReset = jest.fn();
    const onFilter = jest.fn();
    const onClose = jest.fn();

    render(
      <FilterDropdown
        values={values}
        onChange={onChange}
        onReset={onReset}
        onFilter={onFilter}
        onClose={onClose}
      />
    );

    return { onChange, onReset, onFilter, onClose };
  };

  test("renders all filter fields based on config", () => {
    setup();

    expect(screen.getByLabelText("Organization")).toBeInTheDocument();
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Status")).toBeInTheDocument();
  });

  test("calls onChange when input value changes", () => {
    const { onChange } = setup();

    const input = screen.getByLabelText("Username") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Alice" } });

    expect(onChange).toHaveBeenCalledWith("username", "Alice");
  });

  test("calls onReset when Reset button is clicked", () => {
    const { onReset } = setup();

    fireEvent.click(screen.getByText("Reset"));
    expect(onReset).toHaveBeenCalledTimes(1);
  });

  test("calls onFilter and onClose when Filter button is clicked", () => {
    const { onFilter, onClose } = setup();

    fireEvent.click(screen.getByText("Filter"));
    expect(onFilter).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test("does not render unexpected field labels", () => {
    setup();
    expect(screen.queryByLabelText("Nonexistent")).not.toBeInTheDocument();
  });
});
