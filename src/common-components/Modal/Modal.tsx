import "./Modal.scss";
import React from "react";

interface IModal {
  children: React.ReactNode;
  isOpen: boolean;
  handleClose: () => void;
}

const Modal: React.FC<IModal> = ({ children, isOpen, handleClose }) => {
  const showHideClassName = isOpen ? "Modal" : "none";

  return (
    <div className={showHideClassName}>
      <div className="Modal__modal">
        <div className="Modal__close-icon" onClick={handleClose}>
          <span className="Modal__circle-close"> X </span>
        </div>
        {children}
      </div>

      {/* Background  */}
      <div className="Modal__background" onClick={handleClose} />
    </div>
  );
};

export default React.memo(Modal);
