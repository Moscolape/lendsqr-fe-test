import { render, screen, fireEvent } from "@testing-library/react";
import ActivateUserModal from "./activate-modal";

// Mock ModalWrapper to simplify portal behavior in tests
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

describe("ActivateUserModal", () => {
  const closeMock = jest.fn(); // mock close handler
  const onConfirmMock = jest.fn(); // mock confirm handler
  const userName = "John Doe";

  beforeEach(() => {
    jest.clearAllMocks(); // reset mocks before each test
  });

  test("does not render when isOpen is false (negative case)", () => {
    render(
      <ActivateUserModal
        isOpen={false}
        close={closeMock}
        userName={userName}
        onConfirm={onConfirmMock}
      />
    );

    // Modal should not be visible when closed
    expect(screen.queryByText(/Activating User/i)).not.toBeInTheDocument();
  });

  test("renders modal content when open (positive case)", () => {
    render(
      <ActivateUserModal
        isOpen={true}
        close={closeMock}
        userName={userName}
        onConfirm={onConfirmMock}
      />
    );

    // Verify modal text and actions are rendered
    expect(screen.getByText(/Activating User/i)).toBeInTheDocument();
    expect(
      screen.getByText(`Are you sure you want to activate ${userName}?`)
    ).toBeInTheDocument();
    expect(screen.getByText(/No/i)).toBeInTheDocument();
    expect(screen.getByText(/Yes/i)).toBeInTheDocument();
  });

  test("clicking 'No' button closes modal (negative action)", () => {
    render(
      <ActivateUserModal
        isOpen={true}
        close={closeMock}
        userName={userName}
        onConfirm={onConfirmMock}
      />
    );

    // Click cancel action
    fireEvent.click(screen.getByText(/No/i));

    expect(closeMock).toHaveBeenCalled();
    expect(onConfirmMock).not.toHaveBeenCalled();
  });

  test("clicking 'Yes' calls onConfirm and closes modal (positive case)", () => {
    render(
      <ActivateUserModal
        isOpen={true}
        close={closeMock}
        userName={userName}
        onConfirm={onConfirmMock}
      />
    );

    // Confirm activation
    fireEvent.click(screen.getByText(/Yes/i));

    expect(onConfirmMock).toHaveBeenCalledTimes(1);
    expect(closeMock).toHaveBeenCalledTimes(1);
  });

  test("clicking backdrop closes modal (negative case)", () => {
    render(
      <ActivateUserModal
        isOpen={true}
        close={closeMock}
        userName={userName}
        onConfirm={onConfirmMock}
      />
    );

    // Click outside modal content
    fireEvent.click(screen.getByTestId("modal-backdrop"));

    expect(closeMock).toHaveBeenCalled();
    expect(onConfirmMock).not.toHaveBeenCalled();
  });

  test("modal displays correct user name", () => {
    const testUserName = "Grace Effiom";

    render(
      <ActivateUserModal
        isOpen={true}
        close={closeMock}
        userName={testUserName}
        onConfirm={onConfirmMock}
      />
    );

    // Ensure correct user name is shown
    expect(
      screen.getByText(`Are you sure you want to activate ${testUserName}?`)
    ).toBeInTheDocument();
  });
});
