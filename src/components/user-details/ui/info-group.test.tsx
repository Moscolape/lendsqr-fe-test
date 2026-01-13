import { render, screen } from "@testing-library/react";
import { InfoGroup } from "./info-group";

/**
 * Test suite for the InfoGroup component
 *
 * Verifies:
 * - Title rendering
 * - Correct rendering of label–value pairs
 * - Graceful handling of empty, duplicate, or missing items
 */
describe("InfoGroup component", () => {
  // Sample items used across multiple tests
  const items = [
    { label: "Email", value: "test@example.com" },
    { label: "Phone", value: "+123456789" },
  ];

  test("renders the group title (positive case)", () => {
    render(<InfoGroup title="Contact Info" items={items} />);
    expect(screen.getByText("Contact Info")).toBeInTheDocument();
  });

  test("renders all items correctly (positive case)", () => {
    render(<InfoGroup title="Contact Info" items={items} />);

    items.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
      expect(screen.getByText(item.value)).toBeInTheDocument();
    });
  });

  test("renders correctly with empty items array (negative case)", () => {
    render(<InfoGroup title="Empty Info" items={[]} />);

    // Title should still render even when no items are provided
    expect(screen.getByText("Empty Info")).toBeInTheDocument();
  });

  test("handles items with duplicate labels gracefully (edge case)", () => {
    const duplicateItems = [
      { label: "Email", value: "first@example.com" },
      { label: "Email", value: "second@example.com" },
    ];

    render(<InfoGroup title="Duplicates" items={duplicateItems} />);

    // Both values should render despite duplicate labels
    duplicateItems.forEach((item) => {
      expect(screen.getByText(item.value)).toBeInTheDocument();
    });
  });

  test("does not crash when items is undefined (negative case)", () => {
    render(<InfoGroup title="Missing Items" />);
    expect(screen.getByText("Missing Items")).toBeInTheDocument();
  });
});
