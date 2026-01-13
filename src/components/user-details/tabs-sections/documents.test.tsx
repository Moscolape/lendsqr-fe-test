import { render, screen, fireEvent } from "@testing-library/react";
import Documents from "./documents";

/**
 * Test suite for the Documents tab
 *
 * Verifies that:
 * - The section title renders correctly
 * - All document labels are displayed
 * - All action buttons are present and interactive
 * - Invalid or non-existent elements are not rendered
 */
describe("Documents Tab", () => {
  /**
   * Render the Documents component before each test
   * to ensure a clean DOM state.
   */
  beforeEach(() => {
    render(<Documents />);
  });

  test("renders the Documents section title", () => {
    expect(screen.getByText("Documents")).toBeInTheDocument();
  });

  test("renders all document items with their labels", () => {
    const labels = ["Proof of Identity", "Utility Bill", "Employment Letter"];

    labels.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  test("renders all View buttons and they are clickable", () => {
    const buttons = screen.getAllByText("View");

    // Ensure the expected number of buttons exist
    expect(buttons.length).toBe(3);

    // Simulate click interactions
    buttons.forEach((btn) => {
      fireEvent.click(btn);
      expect(btn).toBeEnabled();
    });
  });

  test("does not render non-existent document labels or buttons", () => {
    expect(screen.queryByText("Fake Document")).not.toBeInTheDocument();
    expect(screen.queryByText("Download")).not.toBeInTheDocument();
  });
});
