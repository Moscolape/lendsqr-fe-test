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
  const onConfirmMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("does not render when isOpen is false (negative case)", () => {
    render(
      <BlacklistUserModal
        isOpen={false}
        close={closeMock}
        onConfirm={onConfirmMock}
      />
    );

    expect(screen.queryByText(/Blacklisting User/i)).not.toBeInTheDocument();
  });

  test("clicking 'No' button closes modal (negative action)", () => {
    render(
      <BlacklistUserModal
        isOpen={true}
        close={closeMock}
        onConfirm={onConfirmMock}
      />
    );

    fireEvent.click(screen.getByText(/No/i));

    expect(closeMock).toHaveBeenCalled();
  });

  test("clicking backdrop closes modal (negative case)", () => {
    render(
      <BlacklistUserModal
        isOpen={true}
        close={closeMock}
        onConfirm={onConfirmMock}
      />
    );

    fireEvent.click(screen.getByTestId("modal-backdrop"));

    expect(closeMock).toHaveBeenCalled();
  });
});
