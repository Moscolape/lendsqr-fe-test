import { render, screen, fireEvent } from "@testing-library/react";
import BlacklistUserModal from "./blacklist-modal";


jest.mock("./wrapper/modal-wrapper", () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ isOpen, close, children }: any) =>
    isOpen ? (
      <div data-testid="modal-backdrop" onClick={close}>
        {children}
      </div>
    ) : null,
}));

describe("BlacklistUserModal", () => {
  const closeMock = jest.fn();
  const userId = "user-123";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("does not render when isOpen is false (negative case)", () => {
    render(
      <BlacklistUserModal
        isOpen={false}
        close={closeMock}
        userId={userId}
      />
    );

    expect(
      screen.queryByText(/Blacklisting User/i)
    ).not.toBeInTheDocument();
  });

  test("renders modal content when open (positive case)", () => {
    render(
      <BlacklistUserModal
        isOpen={true}
        close={closeMock}
        userId={userId}
      />
    );

    expect(
      screen.getByText(/Blacklisting User/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Are you sure you want to blacklist this user/i)
    ).toBeInTheDocument();

    expect(screen.getByText(/Yes/i)).toBeInTheDocument();
    expect(screen.getByText(/No/i)).toBeInTheDocument();
  });

  test("clicking 'No' button closes modal (negative action)", () => {
    render(
      <BlacklistUserModal
        isOpen={true}
        close={closeMock}
        userId={userId}
      />
    );

    fireEvent.click(screen.getByText(/No/i));

    expect(closeMock).toHaveBeenCalled();
  });

  test("clicking 'Yes' blacklists user and closes modal (positive case)", () => {
    const consoleSpy = jest
      .spyOn(console, "log")
      .mockImplementation(() => {});

    render(
      <BlacklistUserModal
        isOpen={true}
        close={closeMock}
        userId={userId}
      />
    );

    fireEvent.click(screen.getByText(/Yes/i));

    expect(consoleSpy).toHaveBeenCalledWith(
      `User with id ${userId} has been blacklisted`
    );

    expect(closeMock).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  test("clicking backdrop closes modal (negative case)", () => {
    render(
      <BlacklistUserModal
        isOpen={true}
        close={closeMock}
        userId={userId}
      />
    );

    fireEvent.click(screen.getByTestId("modal-backdrop"));

    expect(closeMock).toHaveBeenCalled();
  });
});
