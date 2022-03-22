import "./ModalProduct.scss";
import React from "react";

import Modal from "../../common-components/Modal/Modal";
import Button from "../../common-components/Button/Button";

interface IModalProducts {
  onClose: () => void;
  isShowModal: boolean;
  imageUrl?: string;
  description?: string;
  label?: string;
}

const ModalProduct: React.FC<IModalProducts> = ({
  onClose,
  isShowModal,
  imageUrl = "",
  description = "",
  label = "",
}) => {
  return (
    <Modal handleClose={onClose} isOpen={isShowModal}>
      <div className="ModalProduct">
        {/* Image  */}
        <div className="ModalProduct__image">
          <img
            style={{ width: "100%", height: "100%" }}
            src={imageUrl}
            alt={label}
          />
        </div>

        <div className="ModalProduct__container ">
          {/* Content  */}
          <div className="ModalProduct__content">
            <div className="ModalProduct__title">{label}</div>
            <div
              className="ModalProduct__description"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>

          {/* Button  */}
          <div className="ModalProduct__button">
            <Button type="primary" onHandleClick={() => {}} content={"Add"} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default React.memo(ModalProduct);
