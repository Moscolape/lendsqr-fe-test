import { render, screen, fireEvent } from "@testing-library/react";
import UserDetailsHeader from "./UserDetailsHeaders";
import { ASSETS } from "../../constants/assets";

jest.mock("../modals/BlacklistModal", () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ isOpen }: any) => (
    <div data-testid="blacklist-modal">{isOpen ? "OPEN" : "CLOSED"}</div>
  ),
}));

jest.mock("../modals/ActivateModal.tsx", () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ isOpen }: any) => (
    <div data-testid="activate-modal">{isOpen ? "OPEN" : "CLOSED"}</div>
  ),
}));

jest.mock("./UserDetailsTabs", () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ activeTab, onChange }: any) => (
    <div>
      <button onClick={() => onChange("Documents")}>Documents</button>
      <span>{activeTab}</span>
    </div>
  ),
}));

describe("UserDetailsHeader Component", () => {
  const onTabChangeMock = jest.fn();
  const userId = "12345";

  beforeEach(() => {
    jest.clearAllMocks();
    render(
      <UserDetailsHeader
        activeTab="General Details"
        onTabChange={onTabChangeMock}
        userId={userId}
      />
    );
  });

  test("renders user profile info correctly", () => {
    expect(screen.getByAltText("avatar")).toBeInTheDocument();
    expect(screen.getByText("Grace Effiom")).toBeInTheDocument();
    expect(screen.getByText("LSQFf587g90")).toBeInTheDocument();
  });

  test("renders user tier stars correctly", () => {
    const stars = screen.getAllByAltText("star");

    expect(stars.length).toBe(3);
    expect(stars[0]).toHaveAttribute("src", ASSETS.starFilled);
    expect(stars[1]).toHaveAttribute("src", ASSETS.starFilled);
    expect(stars[2]).toHaveAttribute("src", ASSETS.starEmpty);
  });

  test("renders user finance info", () => {
    expect(screen.getByText("₦200,000.00")).toBeInTheDocument();
    expect(screen.getByText("9912345678/Providus Bank")).toBeInTheDocument();
  });

  test("renders action buttons and opens modals on click", () => {
    const blacklistBtn = screen.getByText("Blacklist User");
    const activateBtn = screen.getByText("Activate User");

    expect(screen.queryByTestId("blacklist-modal")).not.toBeInTheDocument();
    expect(screen.queryByTestId("activate-modal")).not.toBeInTheDocument();

    fireEvent.click(blacklistBtn);
    expect(screen.getByTestId("blacklist-modal")).toHaveTextContent("OPEN");

    fireEvent.click(activateBtn);
    expect(screen.getByTestId("activate-modal")).toHaveTextContent("OPEN");
  });

  test("calls onTabChange when clicking a tab", () => {
    const documentsTab = screen.getByText("Documents");
    fireEvent.click(documentsTab);

    expect(onTabChangeMock).toHaveBeenCalledTimes(1);
    expect(onTabChangeMock).toHaveBeenCalledWith("Documents");
  });

  test("does not render modals if userId is missing", () => {
    const { queryByTestId } = render(
      <UserDetailsHeader activeTab="General Details" onTabChange={() => {}} />
    );

    expect(queryByTestId("blacklist-modal")).not.toBeInTheDocument();
    expect(queryByTestId("activate-modal")).not.toBeInTheDocument();
  });
});
