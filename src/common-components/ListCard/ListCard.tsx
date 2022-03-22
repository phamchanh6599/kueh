import "./ListCard.scss";
import React, { useCallback } from "react";

import { IProducts } from "../../utils/constant";
import Card from "../Card/Card";

interface IListCard {
  listItems: IProducts[];
  handleClickItem: (item: IProducts) => void;
}

const ListCard: React.FC<IListCard> = ({ listItems, handleClickItem }) => {
  const _renderProduct = useCallback(() => {
    return listItems
      ?.sort((a, b) => a.displayOrder - b.displayOrder)
      ?.map((item) => {
        return (
          <Card
            key={item?.id}
            type="primary"
            image={
              <img
                className="ListCard__image"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
                src={item?.imageUrl}
                alt={item?.label}
                loading="lazy"
              />
            }
            title={item?.label}
            content={item?.description}
            price={`${item?.currency} ${item?.unitPriceFractional}`}
            onHandleClick={() => handleClickItem(item)}
          />
        );
      });
  }, [handleClickItem, listItems]);

  return (
    <div className="ListCard">
      <div className="ListCard__wrapper">{_renderProduct()}</div>
    </div>
  );
};

export default React.memo(ListCard);
