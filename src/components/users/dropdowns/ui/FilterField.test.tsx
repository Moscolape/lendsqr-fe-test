import { render, screen, fireEvent } from "@testing-library/react";
import FilterField from "./FilterField";

describe("FilterField Component", () => {
  test("renders input field with label", () => {
    const mockChange = jest.fn();
    render(<FilterField label="Name" value="" onChange={mockChange} />);

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toHaveAttribute("type", "text");
  });

  test("renders select dropdown when options are provided", () => {
    const mockChange = jest.fn();
    const options = [
      { label: "Option A", value: "A" },
      { label: "Option B", value: "B" },
    ];
    render(
      <FilterField
        label="Choice"
        value=""
        onChange={mockChange}
        options={options}
      />
    );

    expect(screen.getByLabelText("Choice")).toBeInTheDocument();
    expect(screen.getByText("Option A")).toBeInTheDocument();
    expect(screen.getByText("Option B")).toBeInTheDocument();
  });

  test("calls onChange when input value changes", () => {
    const mockChange = jest.fn();
    render(
      <FilterField label="Email" value="" onChange={mockChange} type="email" />
    );

    const input = screen.getByLabelText("Email");
    fireEvent.change(input, { target: { value: "test@example.com" } });

    expect(mockChange).toHaveBeenCalledWith("test@example.com");
  });

  test("calls onChange when select value changes", () => {
    const mockChange = jest.fn();
    const options = [
      { label: "Option A", value: "A" },
      { label: "Option B", value: "B" },
    ];
    render(
      <FilterField
        label="Choice"
        value=""
        onChange={mockChange}
        options={options}
      />
    );

    fireEvent.change(screen.getByLabelText("Choice"), {
      target: { value: "B" },
    });
    expect(mockChange).toHaveBeenCalledWith("B");
  });

  test("does not allow wrong type or value to render", () => {
    const mockChange = jest.fn();
    render(
      <FilterField
        label="Phone Number"
        value="123"
        onChange={mockChange}
        type="tel"
      />
    );

    const input = screen.getByLabelText("Phone Number") as HTMLInputElement;

    expect(input).toHaveAttribute("type", "tel");
    expect(input.value).toBe("123");
    expect(input.value).not.toBe("WRONG_VALUE");
  });
});
