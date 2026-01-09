import React from "react";
import ModalWrapper from "./modal-wrapper";
import "./logout-modal.scss";

type LogoutModalProps = {
  isOpen: boolean;
  close: () => void;
};

const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, close }) => {
  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <ModalWrapper isOpen={isOpen} close={close}>
      <div
        className="logout-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="logout-modal__title">Logging Out</h2>

        <p className="logout-modal__text">
          Are you sure you want to log out?
        </p>

        <div className="logout-modal__actions">
          <button
            className="btn btn--cancel"
            onClick={close}
          >
            No
          </button>

          <button
            className="btn btn--danger"
            onClick={handleLogout}
          >
            Yes
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default LogoutModal;
