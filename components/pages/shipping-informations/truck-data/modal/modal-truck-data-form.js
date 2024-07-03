import { useRouter } from "next/navigation";

import FormTruckData from "./../forms/form-truck-data";

export default function ModalTruckDataForm({ closeModal, isModalOpen }) {
  const router = useRouter();

  const handleClose = () => {
    closeModal();
    router.push("/");
  };

  return (
    <>
      <input
        type="checkbox"
        id="modal_truck_data"
        className="modal-toggle"
        checked={isModalOpen}
        readOnly
      />
      <div className="modal" role="dialog">
        <div className="modal-box w-11/12 max-w-5xl">
          <FormTruckData closeModal={closeModal} />
          <div className="modal-action">
            <label
              htmlFor="modal_truck_data"
              className="btn"
              onClick={() => handleClose()}
            >
              Close
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
