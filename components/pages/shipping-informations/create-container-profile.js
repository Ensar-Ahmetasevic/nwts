import { useState } from "react";

import ModalContainerForm from "./components/modal/modal-container-form";
import { GrAdd } from "react-icons/gr";

export default function CreateContainerProfile() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <div className="flex flex-row space-x-2">
        <div className="tooltip" data-tip="Add Containers">
          <label
            id="addButton"
            className="btnAdd"
            htmlFor="modal_container_form"
            onClick={openModal}
          >
            <GrAdd />
          </label>
        </div>

        {isOpen && <ModalContainerForm closeModal={closeModal} />}
      </div>
    </>
  );
}
