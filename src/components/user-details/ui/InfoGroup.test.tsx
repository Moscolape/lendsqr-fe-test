import { render, screen } from "@testing-library/react";
import { InfoGroup } from "./InfoGroup";

describe("InfoGroup component", () => {
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

    expect(screen.getByText("Empty Info")).toBeInTheDocument();
    expect(screen.queryByText("label")).not.toBeInTheDocument();
    expect(screen.queryByText("value")).not.toBeInTheDocument();
  });

  test("handles items with duplicate labels gracefully (edge case)", () => {
    const duplicateItems = [
      { label: "Email", value: "first@example.com" },
      { label: "Email", value: "second@example.com" },
    ];

    render(<InfoGroup title="Duplicates" items={duplicateItems} />);

    duplicateItems.forEach((item) => {
      expect(screen.getByText(item.value)).toBeInTheDocument();
    });
  });

  test("does not crash when items is undefined (negative case)", () => {
    render(<InfoGroup title="Missing Items" />);
    expect(screen.getByText("Missing Items")).toBeInTheDocument();
  });
});
