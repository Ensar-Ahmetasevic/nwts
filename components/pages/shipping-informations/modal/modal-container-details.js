function ModalContainerDetails({ modalContenData, title }) {
  return (
    <>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
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
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default ModalContainerDetails;
