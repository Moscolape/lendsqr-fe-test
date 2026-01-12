import type { ReactNode } from "react";
import { createPortal } from "react-dom";

import "./modal-wrapper.scss";

type ModalWrapperProps = {
  isOpen: boolean; // controls whether the modal is visible
  close: () => void; // function to close the modal
  children: ReactNode; // modal content
};

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  isOpen,
  close,
  children,
}) => {
  // Do not render anything if the modal is closed
  if (!isOpen) return null;

  // Render modal into document.body using a portal
  return createPortal(
    <div className="modal-backdrop" onClick={close}>
      {children}
    </div>,
    document.body
  );
};

export default ModalWrapper;
