import React from "react";
import ModalWrapper from "./wrapper/modal-wrapper";
import "./modal.scss";

// Props definition for the LogoutModal component
type LogoutModalProps = {
  // Controls whether the modal is visible
  isOpen: boolean;

  // Callback used to close the modal
  close: () => void;
};

// Logout confirmation modal component
const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, close }) => {
  /**
   * Handles user logout action.
   * - Clears sessionStorage and localStorage
   * - Redirects the user back to the login page
   */
  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    // ModalWrapper handles portal rendering and backdrop click behavior
    <ModalWrapper isOpen={isOpen} close={close}>
      {/* 
        Modal container.
        stopPropagation prevents clicks inside the modal
        from triggering the backdrop close handler.
      */}
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {/* Modal title */}
        <h2 className="modal__title">Logging Out</h2>

        {/* Confirmation message */}
        <p className="modal__text">Are you sure you want to log out?</p>

        {/* Modal action buttons */}
        <div className="modal__actions">
          {/* Cancel button simply closes the modal */}
          <button className="btn btn--cancel" onClick={close}>
            No
          </button>

          {/* Confirm button clears storage and logs the user out */}
          <button className="btn btn--danger" onClick={handleLogout}>
            Yes
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default LogoutModal;
