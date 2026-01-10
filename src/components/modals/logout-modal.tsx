import React from "react";
import ModalWrapper from "./wrapper/modal-wrapper";
import "./modal.scss";

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
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal__title">Logging Out</h2>

        <p className="modal__text">Are you sure you want to log out?</p>

        <div className="modal__actions">
          <button className="btn btn--cancel" onClick={close}>
            No
          </button>

          <button className="btn btn--danger" onClick={handleLogout}>
            Yes
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default LogoutModal;
