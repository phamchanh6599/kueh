import "./Section.scss";
import React, { useState } from "react";

import { IProducts } from "../../utils/constant";
import ListCard from "../ListCard/ListCard";
import ModalProduct from "../../components/ModalProduct/ModalProduct";

interface ISection {
  title: string;
  description: string;
  listItems: IProducts[];
  isDisabled?: boolean;
  disabledReason?: string;
  sectionId: string;
}

const Section: React.FC<ISection> = ({
  title,
  description,
  listItems = [],
  isDisabled,
  disabledReason,
  sectionId,
}) => {
  const SectionClass = `Section ${isDisabled ? "Section--disabled" : ""}`;
  const [isShowModal, setIsShowModal] = useState(false);
  const [itemModal, setItemModal] = useState<IProducts>();

  const handleClickItem = (item: IProducts) => {
    setItemModal(item);
    setIsShowModal(true);
  };

  return (
    <div className={SectionClass} id={sectionId}>
      {/* Title  */}
      <div className="Section__content">
        <div className="Section__title">{title}</div>
        {description && (
          <div className="Section__description">{description}</div>
        )}

        {disabledReason && (
          <div className="Section__disabled-text">{disabledReason}</div>
        )}
      </div>

      {/* Card  */}
      <ListCard listItems={listItems} handleClickItem={handleClickItem} />

      {/* Modal  */}
      <ModalProduct
        onClose={() => setIsShowModal(false)}
        isShowModal={isShowModal}
        imageUrl={itemModal?.imageUrl}
        description={itemModal?.description}
        label={itemModal?.label}
      />
    </div>
  );
};

export default React.memo(Section);
