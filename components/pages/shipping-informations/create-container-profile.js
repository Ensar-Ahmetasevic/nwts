import { useState } from "react";
import ModalContainerForm from "./components/modal/modal-container-form";

export default function CreateContainerProfile() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <div className="flex flex-row space-x-2">
        <p>Create Container</p>

        <label
          className="btnAdd"
          onClick={openModal}
          htmlFor="modal_container_form"
        >
          Add
        </label>

        {isOpen && <ModalContainerForm closeModal={closeModal} />}
      </div>
    </>
  );
}
