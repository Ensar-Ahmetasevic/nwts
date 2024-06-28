export default function ModalShowContainerDetails({
  modalContenData,
  title,
  closeModal,
}) {
  return (
    <>
      <input
        type="checkbox"
        id="modal_container_details"
        className="modal-toggle"
      />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">{title}</h3>

          {modalContenData ? (
            <ul>
              {Object.entries(modalContenData).map(([key, value]) => (
                <li key={key} className="py-2">
                  <p className="font-bold">{key}:</p>
                  <p>{value}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No details available</p>
          )}

          <div className="modal-action">
            <label
              htmlFor="modal_container_details"
              className="btn"
              onClick={closeModal}
            >
              Close
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
