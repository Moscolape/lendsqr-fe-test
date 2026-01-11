import { render, screen } from "@testing-library/react";
import SidebarItem from "./Item";


describe("SidebarItem", () => {
  const iconMock = <svg data-testid="icon" />;

  test("renders icon and label correctly (positive case)", () => {
    render(<SidebarItem icon={iconMock} label="Dashboard" />);

    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  test("does not apply active class by default (negative case)", () => {
    const { container } = render(
      <SidebarItem icon={iconMock} label="Users" />
    );

    const sidebarItem = container.firstChild as HTMLElement;

    expect(sidebarItem).toHaveClass("sidebar-item");
    expect(sidebarItem).not.toHaveClass("active");
  });

  test("applies active class when active is true (positive case)", () => {
    const { container } = render(
      <SidebarItem icon={iconMock} label="Settings" active />
    );

    const sidebarItem = container.firstChild as HTMLElement;

    expect(sidebarItem).toHaveClass("sidebar-item");
    expect(sidebarItem).toHaveClass("active");
  });

  test("renders correctly even when active is false (negative case)", () => {
    const { container } = render(
      <SidebarItem icon={iconMock} label="Logout" active={false} />
    );

    const sidebarItem = container.firstChild as HTMLElement;

    expect(sidebarItem).toHaveClass("sidebar-item");
    expect(sidebarItem).not.toHaveClass("active");
  });
});
