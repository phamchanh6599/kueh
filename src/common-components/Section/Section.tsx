import "./Section.scss";
import React from "react";

import { IProducts, ICommonSection } from "../../utils/constant";
import ListCard from "../ListCard/ListCard";

interface ISection {
  title: string;
  description: string;
  listItems: IProducts[];
  isDisabled?: boolean;
  disabledReason?: string;
}

const Section: React.FC<ISection> = ({
  title,
  description,
  listItems = [],
  isDisabled,
  disabledReason,
}) => {
  const SectionClass = `Section ${isDisabled ? "Section--disabled" : ""}`;

  return (
    <div className={SectionClass}>
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
      <ListCard listItems={listItems} />
    </div>
  );
};

export default React.memo(Section);
