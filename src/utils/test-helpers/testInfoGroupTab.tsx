/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";

/**
 * Mocks the InfoGroup component for testing purposes.
 * This allows tests to focus on parent behavior without relying
 * on the actual implementation of InfoGroup.
 */
jest.mock("../../components/user-details/ui/info-group", () => ({
  __esModule: true,
  InfoGroup: jest.fn(({ title, items }: any) => (
    <div data-testid="info-group">
      <h3>{title}</h3>
      {items.map((item: any, index: number) => (
        <div key={index} data-testid="info-item">
          <span>{item.label}</span>: <span>{item.value}</span>
        </div>
      ))}
    </div>
  )),
}));

/**
 * Props for the test helper function:
 * - component: The React component to render in the test.
 * - expectedGroups: An array describing the expected InfoGroups and their items.
 */
type InfoGroupTabProps = {
  component: React.ReactElement;
  expectedGroups: {
    title: string;
    items: { label: string; value: string }[];
  }[];
};

/**
 * Helper function to test a component containing InfoGroup tabs.
 * This avoids repeating similar test logic across multiple InfoGroup-based tabs.
 */
export function testInfoGroupTab({
  component,
  expectedGroups,
}: InfoGroupTabProps) {

  // ✅ Test that all InfoGroups and their items are rendered correctly
  test("renders all InfoGroups and items correctly", () => {
    render(component);

    expectedGroups.forEach((group, groupIndex) => {
      // Select each InfoGroup by index
      const groupNode = screen.getAllByTestId("info-group")[groupIndex];

      // Check the group's title
      expect(groupNode).toHaveTextContent(group.title);

      // Check that each item is rendered with correct label & value
      group.items.forEach((item) => {
        const itemNode = Array.from(
          groupNode.querySelectorAll('[data-testid="info-item"]')
        ).find(
          (node) =>
            node.textContent?.includes(item.label) &&
            node.textContent?.includes(item.value)
        );
        expect(itemNode).toBeDefined();
      });
    });
  });

  // ❌ Negative test: Ensure no incorrect values are rendered
  test("does not render incorrect values (negative case)", () => {
    render(component);

    expectedGroups.forEach((_group, groupIndex) => {
      const groupNode = screen.getAllByTestId("info-group")[groupIndex];

      // Should not contain "WRONG_VALUE"
      expect(groupNode).not.toHaveTextContent("WRONG_VALUE");
    });
  });
}
