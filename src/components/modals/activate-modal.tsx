import React from "react";
import ModalWrapper from "./wrapper/modal-wrapper";
import "./modal.scss";

// Props definition for ActivateUserModal
type ActivateUserModalProps = {
  isOpen: boolean;
  close: () => void;
  userName?: string;
  onConfirm: () => void;
};

const ActivateUserModal: React.FC<ActivateUserModalProps> = ({
  isOpen,
  close,
  userName,
  onConfirm,
}) => {
  // Handle user activation and close modal
  const handleActivateUser = () => {
    onConfirm();
    close();
  };

  return (
    // Wrap modal content with reusable modal wrapper
    <ModalWrapper isOpen={isOpen} close={close}>
      {/* Prevent backdrop click from closing modal */}
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal__title">Activating User</h2>

        {/* Confirmation message */}
        <p className="modal__text">
          Are you sure you want to activate {userName}?
        </p>

        {/* Action buttons */}
        <div className="modal__actions">
          <button className="btn btn--cancel" onClick={close}>
            No
          </button>

          <button
            className="btn btn--proceed"
            onClick={handleActivateUser}
          >
            Yes
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ActivateUserModal;
