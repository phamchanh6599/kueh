import "./Button.scss";

import React, { useCallback } from "react";

interface IButton {
  type: "primary" | "secondary";
  content: React.ReactNode;
  onHandleClick: () => void;
}

const Button: React.FC<IButton> = ({ type, content, onHandleClick }) => {
  const buttonClass = `Button Button--${type}`;

  const handleClick = useCallback(() => {
    onHandleClick();
  }, [onHandleClick]);

  return (
    <div className={buttonClass} onClick={handleClick}>
      {content}
    </div>
  );
};

export default React.memo(Button);
