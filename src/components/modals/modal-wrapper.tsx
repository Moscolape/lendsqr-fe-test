import type { ReactNode } from "react";
import "./modal-wrapper.scss";

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

  return (
    <div className="modal-backdrop" onClick={close}>
      {children}
    </div>
  );
};

export default ModalWrapper;
