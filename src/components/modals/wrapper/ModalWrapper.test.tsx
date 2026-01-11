import { render, screen, fireEvent } from "@testing-library/react";
import ModalWrapper from "./ModalWrapper";

describe("ModalWrapper", () => {
  let closeMock: jest.Mock;

  beforeEach(() => {
    closeMock = jest.fn();
  });

  test("does not render anything when isOpen is false (negative case)", () => {
    const { container } = render(
      <ModalWrapper isOpen={false} close={closeMock}>
        <div>Modal Content</div>
      </ModalWrapper>
    );

    expect(container.firstChild).toBeNull();
    expect(screen.queryByText(/Modal Content/i)).not.toBeInTheDocument();
  });

  test("renders modal content when isOpen is true (positive case)", () => {
    render(
      <ModalWrapper isOpen={true} close={closeMock}>
        <div>Modal Content</div>
      </ModalWrapper>
    );

    expect(screen.getByText(/Modal Content/i)).toBeInTheDocument();
  });

  test("renders modal into document.body via portal (positive case)", () => {
    render(
      <ModalWrapper isOpen={true} close={closeMock}>
        <div data-testid="modal-content">Portal Content</div>
      </ModalWrapper>
    );

    const modalContent = screen.getByTestId("modal-content");

    expect(document.body.contains(modalContent)).toBe(true);
  });

  test("calls close when backdrop is clicked (positive interaction)", () => {
    render(
      <ModalWrapper isOpen={true} close={closeMock}>
        <div>Modal Content</div>
      </ModalWrapper>
    );

    const backdrop = document.querySelector(".modal-backdrop");
    expect(backdrop).toBeInTheDocument();

    fireEvent.click(backdrop!);
    expect(closeMock).toHaveBeenCalledTimes(1);
  });

  test("does not call close when modal is not open (negative case)", () => {
    render(
      <ModalWrapper isOpen={false} close={closeMock}>
        <div>Modal Content</div>
      </ModalWrapper>
    );

    expect(closeMock).not.toHaveBeenCalled();
  });
});
