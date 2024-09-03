export default function ModalShowWasteProfileDetails({
  modalContenData,
  closeModal,
}) {
  return (
    <>
      <input
        type="checkbox"
        id="modal_waste_details"
        className="modal-toggle"
      />
      <div className="modal" role="dialog">
        <div className="modal-box ">
          <div className="mb-6 flex flex-row space-x-4">
            <h3 className="text-lg font-bold">Details for:</h3>
            <p className="text-lg">{modalContenData.name} </p>
          </div>

          <div>
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
          </div>

          <div className="modal-action">
            <label
              htmlFor="modal_waste_details"
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
