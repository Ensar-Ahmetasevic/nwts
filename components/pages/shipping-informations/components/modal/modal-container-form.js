import FormContainerProfile from "./../forms/form-container-profile";

export default function ModalContainerForm({ closeModal }) {
  return (
    <>
      <input
        type="checkbox"
        id="modal_container_form"
        className="modal-toggle"
      />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <FormContainerProfile closeModal={closeModal} />

          <div className="modal-action">
            <label
              htmlFor="modal_container_form"
              className="btn"
              onClick={closeModal}
            >
              Cancel
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
