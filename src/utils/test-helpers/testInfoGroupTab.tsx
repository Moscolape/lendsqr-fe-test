/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";

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

type InfoGroupTabProps = {
  component: React.ReactElement;
  expectedGroups: {
    title: string;
    items: { label: string; value: string }[];
  }[];
};

export function testInfoGroupTab({
  component,
  expectedGroups,
}: InfoGroupTabProps) {
  test("renders all InfoGroups and items correctly", () => {
    render(component);

    expectedGroups.forEach((group, groupIndex) => {
      const groupNode = screen.getAllByTestId("info-group")[groupIndex];

      expect(groupNode).toHaveTextContent(group.title);

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

  test("does not render incorrect values (negative case)", () => {
    render(component);

    expectedGroups.forEach((_group, groupIndex) => {
      const groupNode = screen.getAllByTestId("info-group")[groupIndex];

      expect(groupNode).not.toHaveTextContent("WRONG_VALUE");
    });
  });
}
