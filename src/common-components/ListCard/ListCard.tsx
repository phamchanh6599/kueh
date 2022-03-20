import "./ListCard.scss";
import React from "react";

import { IProducts } from "../../utils/constant";
import Card from "../Card/Card";

interface IListCard {
  listItems: IProducts[];
}

const ListCard: React.FC<IListCard> = ({ listItems }) => {
  const _renderProduct = () => {
    return listItems
      ?.sort((a, b) => a.displayOrder - b.displayOrder)
      ?.map((item) => {
        return (
          <Card
            key={item?.id}
            type="primary"
            image={
              <img
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
                src={item?.imageUrl}
                alt={item?.label}
              />
            }
            title={item?.label}
            content={item?.description}
            price={`${item?.currency} ${item?.unitPriceFractional}`}
            onHandleClick={() => console.log("CARD NE")}
          />
        );
      });
  };

  return (
    <div className="ListCard">
      <div className="ListCard__wrapper">{_renderProduct()}</div>
    </div>
  );
};

export default React.memo(ListCard);
