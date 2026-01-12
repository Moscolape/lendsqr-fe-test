import React from "react";
import ModalWrapper from "./wrapper/modal-wrapper";
import "./modal.scss";

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
  const handleActivateUser = () => {
    onConfirm();
    close();
  };

  return (
    <ModalWrapper isOpen={isOpen} close={close}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal__title">Activating User</h2>

        <p className="modal__text">
          Are you sure you want to activate {userName}?
        </p>

        <div className="modal__actions">
          <button className="btn btn--cancel" onClick={close}>
            No
          </button>

          <button
            className="btn btn--proceed"
            onClick={() => handleActivateUser()}
          >
            Yes
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ActivateUserModal;
