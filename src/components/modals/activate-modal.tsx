import React from "react";
import ModalWrapper from "./wrapper/modal-wrapper";
import "./modal.scss";

type ActivateUserModalProps = {
  isOpen: boolean;
  close: () => void;
  userId: string;
};

const ActivateUserModal: React.FC<ActivateUserModalProps> = ({
  isOpen,
  close,
  userId,
}) => {
  const handleActivateUser = (id: string) => {
    console.log(`User with id ${id} has been activated`);
    close();
  };

  return (
    <ModalWrapper isOpen={isOpen} close={close}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal__title">Activating User</h2>

        <p className="modal__text">
          Are you sure you want to activate this user?
        </p>

        <div className="modal__actions">
          <button className="btn btn--cancel" onClick={close}>
            No
          </button>

          <button
            className="btn btn--proceed"
            onClick={() => handleActivateUser(userId)}
          >
            Yes
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ActivateUserModal;
