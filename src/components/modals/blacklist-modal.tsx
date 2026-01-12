import React from "react";
import ModalWrapper from "./wrapper/modal-wrapper";
import "./modal.scss";

type BlacklistUserModalProps = {
  isOpen: boolean;
  close: () => void;
  userName?: string;
  onConfirm: () => void;
};

const BlacklistUserModal: React.FC<BlacklistUserModalProps> = ({
  isOpen,
  close,
  userName,
  onConfirm,
}) => {
  const handleBlacklistUser = () => {
    onConfirm();
    close();
  };

  return (
    <ModalWrapper isOpen={isOpen} close={close}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal__title">Blacklisting User</h2>

        <p className="modal__text">
          Are you sure you want to blacklist {userName}?
        </p>

        <div className="modal__actions">
          <button className="btn btn--cancel" onClick={close}>
            No
          </button>

          <button
            className="btn btn--danger"
            onClick={() => handleBlacklistUser()}
          >
            Yes
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default BlacklistUserModal;
