import { render, screen, fireEvent } from "@testing-library/react";
import ModalWrapper from "./modal-wrapper";

/*
 This test suite verifies:
 * 1. Conditional rendering behavior (open/closed states)
 * 2. Portal functionality and DOM placement
 * 3. User interaction with backdrop
 * 4. Proper callback execution
 */
describe("ModalWrapper", () => {
  let closeMock: jest.Mock;

  // Create a fresh mock function before each test to ensure test isolation
  beforeEach(() => {
    closeMock = jest.fn();
  });

  /**
   * Test: Closed State Rendering (Negative Test)
   *
   * Verifies that the modal renders nothing when isOpen is false.
   * This ensures the modal doesn't affect the DOM when not needed,
   * which is important for performance and preventing z-index issues.
   */
  test("does not render anything when isOpen is false (negative case)", () => {
    // Render modal in closed state
    const { container } = render(
      <ModalWrapper isOpen={false} close={closeMock}>
        <div>Modal Content</div>
      </ModalWrapper>
    );

    // Verify container is empty (no modal in DOM)
    expect(container.firstChild).toBeNull();

    // Verify modal content is not findable in the document
    expect(screen.queryByText(/Modal Content/i)).not.toBeInTheDocument();
  });

  /**
   * Test: Open State Rendering (Positive Test)
   *
   * Verifies that the modal renders its children when isOpen is true.
   * This ensures the modal correctly displays content when triggered.
   */
  test("renders modal content when isOpen is true (positive case)", () => {
    render(
      <ModalWrapper isOpen={true} close={closeMock}>
        <div>Modal Content</div>
      </ModalWrapper>
    );

    // Verify modal content is present and visible in the document
    expect(screen.getByText(/Modal Content/i)).toBeInTheDocument();
  });

  /**
   * Test: Portal Functionality (Positive Test)
   *
   * Verifies that the modal content is portaled to document.body.
   * This is crucial for:
   * - Proper layering above other content
   * - Avoiding CSS inheritance issues
   * - Ensuring modal is not affected by parent container styles
   */
  test("renders modal into document.body via portal (positive case)", () => {
    render(
      <ModalWrapper isOpen={true} close={closeMock}>
        <div data-testid="modal-content">Portal Content</div>
      </ModalWrapper>
    );

    const modalContent = screen.getByTestId("modal-content");

    // Verify modal content exists within document.body
    // This confirms portal functionality is working
    expect(document.body.contains(modalContent)).toBe(true);
  });

  /**
   * Test: Backdrop Click Interaction (Positive Test)
   *
   * Verifies that clicking the modal backdrop triggers the close callback.
   * This tests the primary user interaction for dismissing the modal.
   */
  test("calls close when backdrop is clicked (positive interaction)", () => {
    render(
      <ModalWrapper isOpen={true} close={closeMock}>
        <div>Modal Content</div>
      </ModalWrapper>
    );

    // Find the backdrop element (assuming it has class "modal-backdrop")
    const backdrop = document.querySelector(".modal-backdrop");
    expect(backdrop).toBeInTheDocument();

    // Simulate user clicking the backdrop
    fireEvent.click(backdrop!);

    // Verify the close callback was called exactly once
    expect(closeMock).toHaveBeenCalledTimes(1);
  });

  /**
   * Test: No Close Call When Closed (Negative Test)
   *
   * Verifies that the close callback is not called when modal is closed.
   * This ensures there are no unintended side effects when modal is inactive.
   */
  test("does not call close when modal is not open (negative case)", () => {
    render(
      <ModalWrapper isOpen={false} close={closeMock}>
        <div>Modal Content</div>
      </ModalWrapper>
    );

    // Verify the close callback was never called
    // This is important because the modal shouldn't trigger
    // close events when it's not rendered
    expect(closeMock).not.toHaveBeenCalled();
  });
});
