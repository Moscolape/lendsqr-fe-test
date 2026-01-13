import { render, screen, fireEvent } from "@testing-library/react";
import ActionItem from "./user-actions";

describe("ActionItem Component", () => {
  // Verifies basic rendering of action button content
  test("renders icon and label", () => {
    const mockClick = jest.fn();
    render(<ActionItem icon="icon.png" label="Delete" onClick={mockClick} />);

    const button = screen.getByRole("button");
    const img = screen.getByAltText("Delete");

    expect(button).toBeInTheDocument();
    expect(img).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  // Confirms click handler is invoked correctly
  test("calls onClick when button is clicked", () => {
    const mockClick = jest.fn();
    render(<ActionItem icon="icon.png" label="Edit" onClick={mockClick} />);

    fireEvent.click(screen.getByText("Edit"));
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  // Ensures component is resilient when onClick is omitted
  test("does not fail if onClick is not provided", () => {
    render(<ActionItem icon="icon.png" label="View" />);
    fireEvent.click(screen.getByText("View")); // Should not throw
  });

  // Guards against rendering incorrect or unexpected labels
  test("does not render wrong label", () => {
    render(<ActionItem icon="icon.png" label="Download" />);
    expect(screen.queryByText("Upload")).not.toBeInTheDocument();
  });
});
