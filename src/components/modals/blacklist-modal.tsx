import React from "react";
import ModalWrapper from "./modal-wrapper";
import "./modal.scss";

type BlacklistUserModalProps = {
  isOpen: boolean;
  close: () => void;
  userId: string;
};

const BlacklistUserModal: React.FC<BlacklistUserModalProps> = ({
  isOpen,
  close,
  userId,
}) => {
  const handleBlacklistUser = (id: string) => {
    console.log(`User with id ${id} has been blacklisted`);
    close();
  };

  return (
    <ModalWrapper isOpen={isOpen} close={close}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal__title">Blacklisting User</h2>

        <p className="modal__text">
          Are you sure you want to blacklist this user?
        </p>

        <div className="modal__actions">
          <button className="btn btn--cancel" onClick={close}>
            No
          </button>

          <button
            className="btn btn--danger"
            onClick={() => handleBlacklistUser(userId)}
          >
            Yes
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default BlacklistUserModal;
