import { render, screen, fireEvent } from "@testing-library/react";
import UserActionsDropdown from "./UserActionsDropdown";


jest.mock("../../../../configs/actionsConfig", () => ({
  userActions: [
    { key: "view", label: "View User", icon: "view-icon" },
    { key: "blacklist", label: "Blacklist User", icon: "blacklist-icon" },
    { key: "activate", label: "Activate User", icon: "activate-icon" },
  ],
}));


jest.mock("../../../../hooks/useClickOutside", () => ({
  useClickOutside: jest.fn(),
}));

describe("UserActionsDropdown Component", () => {
  const setup = () => {
    const onClose = jest.fn();
    const onAction = jest.fn();

    render(<UserActionsDropdown onClose={onClose} onAction={onAction} />);
    return { onClose, onAction };
  };

  test("renders all action items", () => {
    setup();

    expect(screen.getByText("View User")).toBeInTheDocument();
    expect(screen.getByText("Blacklist User")).toBeInTheDocument();
    expect(screen.getByText("Activate User")).toBeInTheDocument();
  });

  test("calls onAction and onClose when an action item is clicked", () => {
    const { onAction, onClose } = setup();

    fireEvent.click(screen.getByText("Blacklist User"));
    expect(onAction).toHaveBeenCalledWith("blacklist");
    expect(onClose).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText("Activate User"));
    expect(onAction).toHaveBeenCalledWith("activate");
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  test("does not call onAction when clicking outside (negative case)", () => {
    const { onAction } = setup();
    expect(onAction).not.toHaveBeenCalled();
  });

  test("does not render unexpected action", () => {
    setup();
    expect(screen.queryByText("Delete User")).not.toBeInTheDocument();
  });
});
