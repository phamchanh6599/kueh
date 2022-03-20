import "./Card.scss";
import React, { useCallback } from "react";

import Button from "../Button/Button";

interface ICard {
  type: "primary" | "secondary";
  image?: React.ReactNode;
  title: string;
  content: React.ReactNode;
  price: React.ReactNode;
  onHandleClick: () => void;
}

const Card: React.FC<ICard> = ({
  type,
  image,
  content,
  price,
  title,
  onHandleClick,
}) => {
  const CardClass = `Card Card--${type}`;
  const CardTitle = `Card__title Card__title--${type}`;
  const CardContent = `Card__content Card__content--${type}`;

  return (
    <div className={CardClass} onClick={onHandleClick}>
      {/* Image  */}
      <div className="Card__image">{image}</div>

      {/* Content  */}
      <div className="Card__container">
        <div className="Card__top">
          <div className={CardTitle}>{title}</div>
          <div className={CardContent}>{content}</div>
        </div>

        {/* Bottom  */}
        <div className="Card__bottom">
          <span className="Card__price">{price}</span>
          <div className="Card__button">
            <Button
              type="primary"
              onHandleClick={onHandleClick}
              content={"Add"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Card);
