import type { ReactNode } from "react";
import { createPortal } from "react-dom";

import "./ModalWrapper.scss";

type ModalWrapperProps = {
  isOpen: boolean;
  close: () => void;
  children: ReactNode;
};

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  isOpen,
  close,
  children,
}) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="modal-backdrop" onClick={close}>
      {children}
    </div>,
    document.body
  );
};

export default ModalWrapper;
