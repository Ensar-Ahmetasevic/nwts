import { useRouter } from "next/navigation";

import FormTruckData from "./../forms/form-truck-data";

export default function ModalTruckDataForm({ closeModal, onSubmitForm }) {
  const router = useRouter();

  const handleClose = (submitted) => {
    closeModal();
    if (!submitted) {
      router.push("/");
    }
  };

  return (
    <>
      <input
        type="checkbox"
        id="modal_truck_data"
        className="modal-toggle"
        checked="true"
        readOnly
      />
      <div className="modal" role="dialog">
        <div className="modal-box w-11/12 max-w-5xl">
          <FormTruckData onSubmitForm={onSubmitForm} />
          <div className="modal-action">
            <label
              htmlFor="modal_truck_data"
              className="btn"
              onClick={() => handleClose(false)}
            >
              Cancel
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
