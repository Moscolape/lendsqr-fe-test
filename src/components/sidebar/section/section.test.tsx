import { render, screen } from "@testing-library/react";
import SidebarSection from "./Section";

describe("SidebarSection", () => {
  test("renders section title correctly (positive case)", () => {
    render(
      <SidebarSection title="Customers">
        <div>Child Content</div>
      </SidebarSection>
    );

    expect(screen.getByText("Customers")).toBeInTheDocument();
  });

  test("renders children correctly (positive case)", () => {
    render(
      <SidebarSection title="Settings">
        <span data-testid="child">Settings Content</span>
      </SidebarSection>
    );

    expect(screen.getByTestId("child")).toBeInTheDocument();
    expect(screen.getByText("Settings Content")).toBeInTheDocument();
  });

  test("renders without crashing when children is empty (negative case)", () => {
    render(<SidebarSection title="Reports">{null}</SidebarSection>);

    expect(screen.getByText("Reports")).toBeInTheDocument();
  });

  test("does not render any child content when children is not provided (negative case)", () => {
    const { container } = render(
      <SidebarSection title="Analytics">{undefined}</SidebarSection>
    );

    const section = container.querySelector(".sidebar-section");
    expect(section?.children.length).toBe(1); // only title
  });
});
